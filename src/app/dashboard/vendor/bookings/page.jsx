'use client';

import { bookingAccept, bookingReject } from '@/lib/actions/addTicket';
import { getRequestBooking } from '@/lib/api/ticket';
import { useSession } from '@/lib/auth-client';
import { Check, X, User, Mail, Ticket, CreditCard, Inbox } from 'lucide-react';
import React, { useEffect, useState } from 'react';


const BookingsPageVendor = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = useSession()
  // ================= FETCH =================
  useEffect(() => {
    console.log("Email:", session?.user?.email);

    const fetchBookings = async () => {
      try {
        setLoading(true);

        const data = await getRequestBooking(session?.user?.email);

        console.log("Bookings:", data);

        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [session]);


  const handleAccept = async (id) => {
    const accept = await bookingAccept(id)
    console.log(accept)
  }

  const handleReject = async (id) => {
    const result = await bookingReject(id);

    if (result.success) {
        setBookings((prev) =>
            prev.map((item) =>
                item._id === id
                    ? { ...item, status: "rejected" }
                    : item
            )
        );
    }
};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 min-h-screen bg-gray-50/50">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Booking Requests
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Review, approve, or decline incoming reservations in real-time.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-2xl shadow-sm self-start sm:self-center">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-sm font-semibold text-gray-700">
            Total Requests: <span className="text-blue-600">{bookings.length}</span>
          </span>
        </div>
      </div>

      {/* Empty State */}
      {bookings.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center shadow-sm max-w-xl mx-auto mt-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-50 text-gray-400 mb-5">
            <Inbox className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            All caught up!
          </h3>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto text-sm leading-relaxed">
            There are no active booking requests right now. New requests will appear here instantly.
          </p>
        </div>
      ) : (
        /* Bookings List Grid */
        <div className="grid gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                {/* Left Side: Image & Meta Data */}
                <div className="flex flex-col sm:flex-row gap-5 flex-1 items-start">
                  <div className="relative flex-shrink-0">
                    <img
                      src={b.image}
                      alt={b.title}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover bg-gray-100 border border-gray-100 shadow-inner"
                    />
                  </div>

                  <div className="flex-1 space-y-3 w-full">
                    <div>
                      <h2 className="font-bold text-lg sm:text-xl text-gray-900 tracking-tight leading-snug">
                        {b.title}
                      </h2>
                    </div>

                    {/* Metadata Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-gray-600">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate font-medium text-gray-800">{b.userName || "Unknown User"}</span>
                      </div>

                      <div className="flex items-center gap-2.5 min-w-0">
                        <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate text-gray-500">{b.userEmail || "No Email Address"}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Ticket className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-500">
                          Qty: <span className="font-semibold text-gray-800">{b.quantity}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-500">
                          Total: <span className="font-bold text-emerald-600 text-base">৳{b.totalPrice}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Status Display & Management Actions */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100 w-full lg:w-auto">

                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider border
                      ${b.status === "pending"
                        ? "bg-amber-50 text-amber-700 border-amber-200/60"
                        : b.status === "accepted"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : "bg-rose-50 text-rose-700 border-rose-200/60"
                      }
                    `}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                      ${b.status === "pending" ? "bg-amber-500" : b.status === "accepted" ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                    />
                    {b.status}
                  </span>

                  {/* Actions Group */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => handleAccept(b._id)}
                      disabled={b.status !== "pending"}
                      className={`inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-xl px-4 py-2.5 transition-all
                        ${b.status === "pending"
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/10 active:scale-95"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed hidden lg:inline-flex"
                        }
                      `}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Accept</span>
                    </button>

                    <button
                      onClick={() => handleReject(b._id)}
                      disabled={b.status !== "pending"}
                      className={`inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-xl px-4 py-2.5 transition-all
                        ${b.status === "pending"
                          ? "bg-white border border-gray-200 text-rose-600 hover:bg-rose-50 hover:border-rose-200 active:scale-95"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed hidden lg:inline-flex"
                        }
                      `}
                    >
                      <X className="w-4 h-4 stroke-[3]" />
                      <span>Reject</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPageVendor;