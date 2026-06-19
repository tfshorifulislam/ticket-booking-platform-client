'use client';

import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const statusStyle = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  approved: 'bg-green-50 text-green-700 border-green-100',
  rejected: 'bg-red-50 text-red-700 border-red-100',
};

const ManageTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // 🔥 FETCH PENDING TICKETS
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/pending-tickets');
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // 🔥 UPDATE STATUS FUNCTION
  const updateStatus = async (id, status) => {
    try {
      setActionLoadingId(id);

      const res = await fetch(`http://localhost:5000/api/ticket/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (data.modifiedCount > 0) {
        setTickets((prev) =>
          prev.map((t) =>
            t._id === id ? { ...t, status } : t
          )
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-gray-500">Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Manage Vendor Tickets
      </h1>

      <div className="bg-white border border-green-100 rounded-2xl shadow-sm overflow-x-auto">

        <table className="min-w-full text-sm">

          <thead className="bg-green-50 text-gray-600 text-xs uppercase">
            <tr>
              <th className="text-left px-6 py-4">Ticket</th>
              <th className="text-left px-6 py-4">Vendor</th>
              <th className="text-left px-6 py-4">Route</th>
              <th className="text-left px-6 py-4">Price</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {tickets.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No pending tickets
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => {
                const isLoading = actionLoadingId === ticket._id;

                return (
                  <tr key={ticket._id} className="hover:bg-green-50/40">

                    <td className="px-6 py-4 font-medium text-gray-900">
                      {ticket.title}
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-medium">{ticket.vendorName}</p>
                      <p className="text-xs text-gray-500">{ticket.vendorEmail}</p>
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {ticket.from} → {ticket.to}
                    </td>

                    <td className="px-6 py-4 font-semibold text-green-600">
                      ৳ {ticket.price}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full border capitalize ${statusStyle[ticket.status]}`}
                      >
                        {ticket.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">

                        <button
                          disabled={isLoading}
                          onClick={() => updateStatus(ticket._id, 'approved')}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                        >
                          <FaCheck />
                          {isLoading ? '...' : 'Approve'}
                        </button>

                        <button
                          disabled={isLoading}
                          onClick={() => updateStatus(ticket._id, 'rejected')}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                        >
                          <FaTimes />
                          {isLoading ? '...' : 'Reject'}
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default ManageTicket;