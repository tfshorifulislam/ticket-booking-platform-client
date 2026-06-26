'use client';

import { bookingAccept, bookingReject } from '@/lib/actions/addTicket';
import { getRequestBooking } from '@/lib/api/ticket';
import { useSession } from '@/lib/auth-client';
import { Check, X, User, Mail, Ticket, CreditCard, Inbox } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const BookingsPageVendor = () => {
  const router = useRouter()
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
    router.push('/dashboard/vendor/bookings')
    toast.success('ticket accepted')

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
      toast.warn('ticket rejected')
  };

  return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 min-h-screen bg-slate-50 dark:bg-zinc-950">

    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">

      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Booking Requests
        </h1>

        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
          Review, approve, or decline incoming reservations in real-time.
        </p>
      </div>

      <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-2xl shadow-sm">
        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Total Requests:{" "}
          <span className="text-blue-600">{bookings.length}</span>
        </span>
      </div>

    </div>

    {/* Empty State */}
    {bookings.length === 0 ? (
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-16 text-center shadow-sm max-w-xl mx-auto mt-12">

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 mb-5">
          <Inbox className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          All caught up!
        </h3>

        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto text-sm leading-relaxed">
          There are no active booking requests right now. New requests will appear here instantly.
        </p>

      </div>
    ) : (
      /* Bookings List */
      <div className="grid gap-6">

        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all"
          >

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

              {/* Left */}
              <div className="flex flex-col sm:flex-row gap-5 flex-1 items-start">

                <img
                  src={b.image}
                  alt={b.title}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800"
                />

                <div className="flex-1 space-y-3 w-full">

                  <h2 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                    {b.title}
                  </h2>

                  {/* Meta */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-500 dark:text-slate-400">

                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="text-slate-800 dark:text-slate-200 font-medium truncate">
                        {b.userName || "Unknown"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{b.userEmail}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4" />
                      Qty: <span className="font-semibold">{b.quantity}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Total:{" "}
                      <span className="font-bold text-emerald-600">
                        ৳{b.totalPrice}
                      </span>
                    </div>

                  </div>

                </div>

              </div>

              {/* Right */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4">

                {/* Status */}
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold uppercase border
                    ${
                      b.status === "pending"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : b.status === "accepted"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-2
                      ${
                        b.status === "pending"
                          ? "bg-amber-500"
                          : b.status === "accepted"
                          ? "bg-emerald-500"
                          : "bg-rose-500"
                      }`}
                  />
                  {b.status}
                </span>

                {/* Actions (always visible, no layout breaking) */}
                <div className="flex gap-2">

                  <button
                    onClick={() => handleAccept(b._id)}
                    disabled={b.status !== "pending"}
                    className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(b._id)}
                    disabled={b.status !== "pending"}
                    className="px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Reject
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