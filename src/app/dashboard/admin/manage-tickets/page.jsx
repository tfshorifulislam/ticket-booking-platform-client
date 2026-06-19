'use client';

import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const dummyTickets = [
  {
    id: 1,
    title: 'Dhaka to Chittagong Express',
    vendor: 'Rahim Transport',
    email: 'vendor1@gmail.com',
    from: 'Dhaka',
    to: 'Chittagong',
    price: 500,
    status: 'pending',
  },
  {
    id: 2,
    title: 'Sylhet Night Coach',
    vendor: 'Green Line',
    email: 'green@gmail.com',
    from: 'Dhaka',
    to: 'Sylhet',
    price: 800,
    status: 'pending',
  },
];

const statusStyle = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  approved: 'bg-green-50 text-green-700 border-green-100',
  rejected: 'bg-red-50 text-red-700 border-red-100',
};

const ManageTicket = () => {
  const handleApprove = (id) => {
    console.log('Approved:', id);
    // TODO: API call → status = approved
  };

  const handleReject = (id) => {
    console.log('Rejected:', id);
    // TODO: API call → status = rejected
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Manage Vendor Tickets
      </h1>

      {/* Table */}
      <div className="bg-white border border-green-100 rounded-2xl shadow-sm overflow-x-auto">

        <table className="min-w-full text-sm">

          {/* Head */}
          <thead className="bg-green-50 text-gray-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-6 py-4">Ticket</th>
              <th className="text-left px-6 py-4">Vendor</th>
              <th className="text-left px-6 py-4">Route</th>
              <th className="text-left px-6 py-4">Price</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">

            {dummyTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-green-50/40 transition">

                {/* Ticket */}
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">
                    {ticket.title}
                  </p>
                </td>

                {/* Vendor */}
                <td className="px-6 py-4">
                  <p className="text-gray-900 font-medium">
                    {ticket.vendor}
                  </p>
                  <p className="text-xs text-gray-500">
                    {ticket.email}
                  </p>
                </td>

                {/* Route */}
                <td className="px-6 py-4 text-gray-700">
                  {ticket.from} → {ticket.to}
                </td>

                {/* Price */}
                <td className="px-6 py-4 font-semibold text-green-600">
                  ৳ {ticket.price}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full border capitalize ${statusStyle[ticket.status]}`}>
                    {ticket.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => handleApprove(ticket.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                    >
                      <FaCheck />
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(ticket.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      <FaTimes />
                      Reject
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default ManageTicket;