'use client';

import React from 'react';
import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from 'react-icons/fa';

const dummyTickets = [
  {
    id: 1,
    title: 'Dhaka to Chittagong Express',
    from: 'Dhaka',
    to: 'Chittagong',
    price: 500,
    quantity: 20,
    status: 'pending',
  },
  {
    id: 2,
    title: 'Sylhet Night Coach',
    from: 'Dhaka',
    to: 'Sylhet',
    price: 800,
    quantity: 10,
    status: 'approved',
  },
  {
    id: 3,
    title: 'Rajshahi Fast Line',
    from: 'Dhaka',
    to: 'Rajshahi',
    price: 400,
    quantity: 5,
    status: 'rejected',
  },
];

const statusStyle = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  approved: 'bg-green-50 text-green-700 border-green-100',
  rejected: 'bg-red-50 text-red-700 border-red-100',
};

const statusIcon = {
  pending: <FaClock />,
  approved: <FaCheckCircle />,
  rejected: <FaTimesCircle />,
};

const MyTicketPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        My Tickets
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {dummyTickets.map((ticket) => {
          const isRejected = ticket.status === 'rejected';

          return (
            <div
              key={ticket.id}
              className="border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition p-5 flex flex-col gap-4"
            >

              {/* Title */}
              <div>
                <h2 className="font-semibold text-gray-900">
                  {ticket.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {ticket.from} → {ticket.to}
                </p>
              </div>

              {/* Price + Qty */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Qty: <span className="text-gray-900 font-medium">{ticket.quantity}</span>
                </span>

                <span className="text-gray-900 font-semibold">
                  ৳ {ticket.price}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">

                <span
                  className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border capitalize ${statusStyle[ticket.status]}`}
                >
                  {statusIcon[ticket.status]}
                  {ticket.status}
                </span>

              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-auto">

                <button
                  disabled={isRejected}
                  className={`flex-1 flex items-center justify-center gap-2 text-sm px-3 py-2 rounded-lg border transition
                    ${isRejected
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'hover:bg-green-50 text-gray-700 border-gray-200'
                    }`}
                >
                  <FaEdit />
                  Update
                </button>

                <button
                  disabled={isRejected}
                  className={`flex-1 flex items-center justify-center gap-2 text-sm px-3 py-2 rounded-lg border transition
                    ${isRejected
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'hover:bg-red-50 text-gray-700 border-gray-200'
                    }`}
                >
                  <FaTrash />
                  Delete
                </button>

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default MyTicketPage;