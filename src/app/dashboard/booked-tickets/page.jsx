'use client';

import React from 'react';
import {
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaTicketAlt,
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
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  accepted: 'bg-blue-50 text-blue-700 border-blue-100',
  rejected: 'bg-red-50 text-red-700 border-red-100',
  paid: 'bg-green-50 text-green-700 border-green-100',
};

const BookedTickets = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
        My Booked Tickets
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {dummyTickets.map((ticket) => {

          const totalPrice = ticket.unitPrice * ticket.quantity;

          return (
            <div
              key={ticket.id}
              className="border rounded-2xl bg-white shadow-sm overflow-hidden hover:shadow-md transition"
            >

              {/* Image */}
              <div className="h-40 bg-gray-100">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">

                {/* Title */}
                <h2 className="font-semibold text-gray-900">
                  {ticket.title}
                </h2>

                {/* Route */}
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  {ticket.from} → {ticket.to}
                </p>

                {/* Quantity + Price */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Qty: {ticket.quantity}
                  </span>

                  <span className="flex items-center gap-1 text-gray-900 font-medium">
                    <FaMoneyBill />
                    ৳ {totalPrice}
                  </span>
                </div>

                {/* Departure */}
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  <FaClock />
                  {ticket.departure}
                </p>

                {/* Status */}
                <div className="flex items-center justify-between">

                  <span
                    className={`text-xs px-2 py-1 rounded-full border capitalize ${statusStyle[ticket.status]}`}
                  >
                    {ticket.status}
                  </span>

                  {/* Pay Button (only if accepted) */}
                  {ticket.status === 'accepted' && (
                    <button className="text-xs px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
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