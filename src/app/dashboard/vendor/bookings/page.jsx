'use client';

import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const dummyBookings = [
  {
    id: 1,
    userName: 'John Doe',
    userEmail: 'john@gmail.com',
    ticketTitle: 'Dhaka to Chittagong Express',
    quantity: 2,
    unitPrice: 500,
    status: 'pending',
  },
  {
    id: 2,
    userName: 'Sarah Khan',
    userEmail: 'sarah@gmail.com',
    ticketTitle: 'Sylhet Night Coach',
    quantity: 1,
    unitPrice: 800,
    status: 'pending',
  },
];

const BookingsPageVendor = () => {
  const handleAccept = (id) => {
    console.log('Accepted:', id);
    // TODO: API call → update status = accepted
  };

  const handleReject = (id) => {
    console.log('Rejected:', id);
    // TODO: API call → update status = rejected
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Booking Requests
      </h1>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-x-auto">

        <table className="min-w-full text-sm">

          {/* Head */}
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-6 py-4">User</th>
              <th className="text-left px-6 py-4">Ticket</th>
              <th className="text-left px-6 py-4">Quantity</th>
              <th className="text-left px-6 py-4">Total Price</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">

            {dummyBookings.map((booking) => {
              const totalPrice = booking.quantity * booking.unitPrice;

              return (
                <tr key={booking.id} className="hover:bg-gray-50 transition">

                  {/* User */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {booking.userName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.userEmail}
                      </p>
                    </div>
                  </td>

                  {/* Ticket */}
                  <td className="px-6 py-4 text-gray-700">
                    {booking.ticketTitle}
                  </td>

                  {/* Qty */}
                  <td className="px-6 py-4 text-gray-700">
                    {booking.quantity}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 font-semibold text-emerald-600">
                    ৳ {totalPrice}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() => handleAccept(booking.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                      >
                        <FaCheck />
                        Accept
                      </button>

                      <button
                        onClick={() => handleReject(booking.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                      >
                        <FaTimes />
                        Reject
                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default BookingsPageVendor;