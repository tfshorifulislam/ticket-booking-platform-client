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

  // 🔥 modal state
  const [editTicket, setEditTicket] = useState(null);
  const [formData, setFormData] = useState({
    price: '',
    quantity: '',
  });

  // ================= FETCH =================
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

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const ok = window.confirm('Delete this ticket?');
    if (!ok) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/ticket/${id}`,
        { method: 'DELETE' }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setTickets((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ================= OPEN MODAL =================
  const handleUpdate = (ticket) => {
    setEditTicket(ticket);
    setFormData({
      price: ticket.price,
      quantity: ticket.quantity,
    });
  };

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT UPDATE =================
  const submitUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/ticket/${editTicket._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            price: Number(formData.price),
            quantity: Number(formData.quantity),
          }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        setTickets((prev) =>
          prev.map((t) =>
            t._id === editTicket._id
              ? { ...t, ...formData }
              : t
          )
        );

        setEditTicket(null);
      }
    } catch (err) {
      console.error(err);
    }
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

      <h1 className="text-2xl font-semibold mb-6">
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
                className="border rounded-2xl p-5 shadow-sm flex flex-col gap-4"
              >

                {/* TITLE */}
                <div>
                  <h2 className="font-semibold">
                    {ticket.title}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {ticket.from} → {ticket.to}
                  </p>
                </div>

                {/* PRICE */}
                <div className="flex justify-between text-sm">
                  <span>Qty: {ticket.quantity}</span>
                  <span className="font-semibold">৳ {ticket.price}</span>
                </div>

                {/* STATUS */}
                <div>
                  <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded border ${statusStyle[ticket.status]}`}>
                    {statusIcon[ticket.status]}
                    {ticket.status}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 mt-auto">

                  <button
                    onClick={() => handleUpdate(ticket)}
                    disabled={isRejected}
                    className={`flex-1 flex items-center justify-center gap-2 text-sm px-3 py-2 rounded border
                      ${isRejected ? 'bg-gray-100 text-gray-400' : 'hover:bg-green-50'}`}
                  >
                    <FaEdit />
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(ticket._id)}
                    disabled={isRejected}
                    className={`flex-1 flex items-center justify-center gap-2 text-sm px-3 py-2 rounded border
                      ${isRejected ? 'bg-gray-100 text-gray-400' : 'hover:bg-red-50'}`}
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

      {/* ================= MODAL ================= */}
      {editTicket && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[90%] max-w-md p-6 rounded-2xl">

            <h2 className="text-lg font-semibold mb-4">
              Update Ticket
            </h2>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
              placeholder="Price"
            />

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-4"
              placeholder="Quantity"
            />

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setEditTicket(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={submitUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyTicketPage;