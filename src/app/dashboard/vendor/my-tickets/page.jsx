'use client';

import React, { useEffect, useState } from 'react';
import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from 'react-icons/fa';
import { useSession } from '@/lib/auth-client';

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
  const { data: session } = useSession();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const email = session?.user?.email;
        if (!email) return;

        const res = await fetch(
          `http://localhost:5000/api/my-tickets?email=${email}`
        );

        const data = await res.json();
        setTickets(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [session?.user?.email]);

  // DELETE ticket
  const handleDelete = async (id) => {
    const ok = window.confirm('Are you sure you want to delete this ticket?');
    if (!ok) return;

    try {
      const res = await fetch(`http://localhost:5000/api/ticket/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.deletedCount > 0) {
        setTickets((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // UPDATE (future API ready)
  const handleUpdate = (id) => {
    console.log('Update ticket:', id);
    // future: open modal / redirect to edit page
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4">
        <p className="text-gray-500">Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        My Tickets
      </h1>

      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {tickets.map((ticket) => {
            const isRejected = ticket.status === 'rejected';

            return (
              <div
                key={ticket._id}
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
                    Qty:{' '}
                    <span className="text-gray-900 font-medium">
                      {ticket.quantity}
                    </span>
                  </span>

                  <span className="text-gray-900 font-semibold">
                    ৳ {ticket.price}
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span
                    className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border capitalize ${
                      statusStyle[ticket.status]
                    }`}
                  >
                    {statusIcon[ticket.status]}
                    {ticket.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">

                  {/* UPDATE */}
                  <button
                    onClick={() => handleUpdate(ticket._id)}
                    disabled={isRejected}
                    className={`flex-1 flex items-center justify-center gap-2 text-sm px-3 py-2 rounded-lg border transition
                      ${
                        isRejected
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'hover:bg-green-50 text-gray-700 border-gray-200'
                      }`}
                  >
                    <FaEdit />
                    Update
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(ticket._id)}
                    disabled={isRejected}
                    className={`flex-1 flex items-center justify-center gap-2 text-sm px-3 py-2 rounded-lg border transition
                      ${
                        isRejected
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
      )}
    </div>
  );
};

export default MyTicketPage;