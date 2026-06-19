'use client';

import React, { useEffect, useState } from 'react';
import {
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBill,
} from 'react-icons/fa';

const statusStyle = {
  pending: 'bg-amber-50 text-amber-700 border-amber-100',
  accepted: 'bg-sky-50 text-sky-700 border-sky-100',
  rejected: 'bg-rose-50 text-rose-700 border-rose-100',
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

const BookedTickets = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/bookings');
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ================= COUNTDOWN =================
  const getCountdown = (departure) => {
    const target = new Date(departure);
    const now = new Date();

    const diff = target - now;

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m`;
  };

  // ================= PAY =================
  const handlePay = async (booking) => {
    const departureTime = new Date(booking.departure);
    const now = new Date();

    if (departureTime < now) {
      alert("Payment not allowed after departure time!");
      return;
    }

    alert(`Redirecting to Stripe for ৳ ${booking.unitPrice * booking.quantity}`);
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-2xl font-semibold mb-8">
        My Booked Tickets
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {bookings.map((ticket) => {
          const totalPrice = ticket.unitPrice * ticket.quantity;
          const countdown = getCountdown(ticket.departure);
          const isRejected = ticket.status === 'rejected';
          const isPaid = ticket.status === 'paid';

          return (
            <div
              key={ticket._id}
              className="bg-white border rounded-2xl shadow-sm p-5 space-y-3"
            >

              {/* IMAGE */}
              <img
                src={ticket.image}
                className="h-40 w-full object-cover rounded-xl"
              />

              {/* TITLE */}
              <h2 className="font-semibold">
                {ticket.title}
              </h2>

              {/* ROUTE */}
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <FaMapMarkerAlt />
                {ticket.from} → {ticket.to}
              </p>

              {/* QTY + PRICE */}
              <div className="flex justify-between text-sm">
                <span>Qty: {ticket.quantity}</span>
                <span className="font-semibold flex items-center gap-1">
                  <FaMoneyBill />
                  ৳ {totalPrice}
                </span>
              </div>

              {/* DEPARTURE */}
              <p className="text-xs text-gray-500">
                {ticket.departure}
              </p>

              {/* COUNTDOWN */}
              {!isRejected && countdown && (
                <p className="text-blue-600 text-sm font-medium">
                  ⏳ {countdown}
                </p>
              )}

              {/* STATUS */}
              <span className={`text-xs px-2 py-1 rounded border ${statusStyle[ticket.status]}`}>
                {ticket.status}
              </span>

              {/* PAY BUTTON */}
              {ticket.status === 'accepted' && !isPaid && (
                <button
                  onClick={() => handlePay(ticket)}
                  className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Pay Now
                </button>
              )}

              {isPaid && (
                <p className="text-green-600 text-sm font-semibold">
                  Payment Completed
                </p>
              )}

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default BookedTickets;