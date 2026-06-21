'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { getUserAddedTicket } from '@/lib/api/ticket';
import { FaMapMarkerAlt, FaMoneyBill, FaClock } from 'react-icons/fa';

const statusStyle = {
  pending: 'bg-amber-100 text-amber-700 border border-amber-200',
  accepted: 'bg-sky-100 text-sky-700 border border-sky-200',
  rejected: 'bg-rose-100 text-rose-700 border border-rose-200',
  paid: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
};

const BookedTickets = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = useSession();
  const userEmail = session?.user?.email;

  // ================= FETCH =================
  useEffect(() => {
    if (isPending) return;

    if (!userEmail) {
      setLoading(false);
      setBookings([]);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);

        const res = await getUserAddedTicket(userEmail);

        setBookings(Array.isArray(res) ? res : []);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail, isPending]);

  // ================= COUNTDOWN =================
  const getCountdown = (departure) => {
    if (!departure) return null;

    const target = new Date(departure);
    if (isNaN(target.getTime())) return null;

    const now = new Date();
    const diff = target - now;

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return { days, hours, minutes };
  };

  // ================= LOADING =================
  if (loading || isPending) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <p className="text-gray-500">Loading your bookings...</p>
      </div>
    );
  }

  // ================= EMPTY STATE =================
  if (!bookings.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center bg-white rounded-3xl border">
        <p className="text-xl text-gray-500">
          You haven't booked any tickets yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">My Booked Tickets</h1>
      <p className="text-gray-600 mb-8">Manage all your booked journeys</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {bookings.map((ticket) => {
          const totalPrice = Number(ticket.totalPrice) || 0;

          const countdown = getCountdown(ticket.departure);
          const isPast = ticket.departure
            ? new Date(ticket.departure) < new Date()
            : false;

          const statusClass =
            statusStyle[ticket.status] ||
            'bg-gray-100 text-gray-600 border-gray-200';

          return (
            <div
              key={ticket._id}
              className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
            >

              {/* IMAGE */}
              <div className="relative h-52">
                <img
                  src={ticket.image || '/placeholder.jpg'}
                  alt={ticket.title || 'ticket'}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 right-4">
                  <span
                    className={`text-xs px-4 py-1.5 rounded-full font-medium border ${statusClass}`}
                  >
                    {(ticket.status || 'unknown').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-4">

                {/* TITLE */}
                <h2 className="font-semibold text-lg line-clamp-2">
                  {ticket.title || 'Untitled Ticket'}
                </h2>

                {/* ROUTE */}
                <p className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaMapMarkerAlt className="text-emerald-600" />
                  {(ticket.from || 'N/A')} → {(ticket.to || 'N/A')}
                </p>

                {/* QTY + PRICE */}
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Quantity</p>
                    <p className="font-semibold">
                      {ticket.quantity || 0} Tickets
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">Total Price</p>
                    <p className="font-bold text-xl text-emerald-600">
                      ৳ {totalPrice}
                    </p>
                  </div>
                </div>

                {/* DEPARTURE */}
                <div>
                  <p className="text-xs text-gray-500">Departure</p>
                  <p className="text-sm font-medium">
                    {ticket.departure
                      ? new Date(ticket.departure).toLocaleString('en-US', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })
                      : 'N/A'}
                  </p>
                </div>

                {/* COUNTDOWN */}
                {countdown && !isPast && (
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 flex items-center gap-3">
                    <FaClock className="text-blue-600" />
                    <div>
                      <p className="text-xs text-blue-600 font-medium">
                        TIME LEFT
                      </p>
                      <p className="font-mono font-semibold text-blue-700">
                        {countdown.days}d {countdown.hours}h {countdown.minutes}m
                      </p>
                    </div>
                  </div>
                )}

                {/* ACTIONS */}
                {ticket.status === 'accepted' && (
                  <button
                    onClick={() =>
                      alert(`Proceeding payment: ৳ ${totalPrice}`)
                    }
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-2xl transition"
                  >
                    Pay Now - ৳ {totalPrice}
                  </button>
                )}

                {ticket.status === 'paid' && (
                  <p className="text-center text-emerald-600 font-semibold py-2">
                    ✓ Payment Completed Successfully
                  </p>
                )}

                {ticket.status === 'rejected' && (
                  <p className="text-center text-rose-600 font-medium py-2">
                    Booking Rejected
                  </p>
                )}

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default BookedTickets;