'use client';

import React, { useState } from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';

const initialTickets = [
  {
    id: 1,
    title: 'Dhaka to Chittagong Express',
    from: 'Dhaka',
    to: 'Chittagong',
    price: 500,
    advertised: false,
  },
  {
    id: 2,
    title: 'Sylhet Night Coach',
    from: 'Dhaka',
    to: 'Sylhet',
    price: 800,
    advertised: false,
  },
  {
    id: 3,
    title: 'Rajshahi Fast Line',
    from: 'Dhaka',
    to: 'Rajshahi',
    price: 400,
    advertised: false,
  },
];

const AdvertiseTickets = () => {
  const [tickets, setTickets] = useState(initialTickets);

  // count advertised tickets
  const advertisedCount = tickets.filter((t) => t.advertised).length;

  const handleToggle = (id) => {
    const target = tickets.find((t) => t.id === id);

    if (!target) return;

    // If trying to advertise
    if (!target.advertised && advertisedCount >= 6) {
      alert('You cannot advertise more than 6 tickets');
      return;
    }

    const updated = tickets.map((t) =>
      t.id === id
        ? { ...t, advertised: !t.advertised }
        : t
    );

    setTickets(updated);

    // TODO:
    // API CALL → PATCH /tickets/:id { advertised: boolean }
    // Backend must enforce max 6 rule also
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Advertise Tickets
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Advertised: {advertisedCount} / 6
        </p>
      </div>

      {/* Table */}
      <div className="bg-white border border-green-100 rounded-2xl shadow-sm overflow-x-auto">

        <table className="min-w-full text-sm">

          {/* Head */}
          <thead className="bg-green-50 text-gray-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-6 py-4">Ticket</th>
              <th className="text-left px-6 py-4">Route</th>
              <th className="text-left px-6 py-4">Price</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">

            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-green-50/40 transition">

                {/* Title */}
                <td className="px-6 py-4 font-medium text-gray-900">
                  {ticket.title}
                </td>

                {/* Route */}
                <td className="px-6 py-4 text-gray-600">
                  {ticket.from} → {ticket.to}
                </td>

                {/* Price */}
                <td className="px-6 py-4 text-green-600 font-semibold">
                  ৳ {ticket.price}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  {ticket.advertised ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
                      Advertised
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-100">
                      Not Active
                    </span>
                  )}
                </td>

                {/* Toggle */}
                <td className="px-6 py-4">

                  <button
                    onClick={() => handleToggle(ticket.id)}
                    className="flex items-center gap-2 text-sm font-medium"
                  >

                    {ticket.advertised ? (
                      <>
                        <FaToggleOn className="text-green-600 text-2xl" />
                        <span className="text-green-600">Unadvertise</span>
                      </>
                    ) : (
                      <>
                        <FaToggleOff className="text-gray-400 text-2xl" />
                        <span className="text-gray-600">Advertise</span>
                      </>
                    )}

                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default AdvertiseTickets;