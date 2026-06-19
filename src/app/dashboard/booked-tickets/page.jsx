'use client';

import React from 'react';
import {
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBill,
} from 'react-icons/fa';

const dummyTickets = [
  {
    id: 1,
    title: 'Dhaka to Chittagong Express',
    image: '/bus.jpg',
    quantity: 2,
    unitPrice: 500,
    from: 'Dhaka',
    to: 'Chittagong',
    departure: '2026-06-25 10:30 AM',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Sylhet Night Coach',
    image: '/bus.jpg',
    quantity: 1,
    unitPrice: 800,
    from: 'Dhaka',
    to: 'Sylhet',
    departure: '2026-06-22 09:00 PM',
    status: 'accepted',
  },
  {
    id: 3,
    title: 'Rajshahi Fast Line',
    image: '/bus.jpg',
    quantity: 3,
    unitPrice: 400,
    from: 'Dhaka',
    to: 'Rajshahi',
    departure: '2026-06-20 06:00 AM',
    status: 'paid',
  },
];

const statusStyle = {
  pending: 'bg-amber-50 text-amber-700 border-amber-100',
  accepted: 'bg-sky-50 text-sky-700 border-sky-100',
  rejected: 'bg-rose-50 text-rose-700 border-rose-100',
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

const BookedTickets = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-slate-900 mb-8 tracking-tight">
        My Booked Tickets
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {dummyTickets.map((ticket) => {
          const totalPrice = ticket.unitPrice * ticket.quantity;

          return (
            <div
              key={ticket.id}
              className="group rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
            >

              {/* Image */}
              <div className="h-40 overflow-hidden bg-slate-100">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">

                {/* Title */}
                <h2 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition">
                  {ticket.title}
                </h2>

                {/* Route */}
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-slate-400" />
                  {ticket.from} → {ticket.to}
                </p>

                {/* Qty + Price */}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Qty: <span className="text-slate-900 font-medium">{ticket.quantity}</span>
                  </span>

                  <span className="flex items-center gap-1 font-semibold text-slate-900">
                    <FaMoneyBill className="text-emerald-600" />
                    ৳ {totalPrice}
                  </span>
                </div>

                {/* Departure */}
                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <FaClock className="text-slate-400" />
                  {ticket.departure}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2">

                  <span
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium capitalize ${statusStyle[ticket.status]}`}
                  >
                    {ticket.status}
                  </span>

                  {ticket.status === 'accepted' && (
                    <button className="text-xs px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm">
                      Pay Now
                    </button>
                  )}

                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default BookedTickets;