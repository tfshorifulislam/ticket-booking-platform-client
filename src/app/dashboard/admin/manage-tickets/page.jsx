'use client';

import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

const statusStyle = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  approved: 'bg-green-50 text-green-700 border-green-100',
  rejected: 'bg-red-50 text-red-700 border-red-100',
};

const ManageTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // 🔥 delete modal state
  const [deleteId, setDeleteId] = useState(null);

  // FETCH
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

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      setActionLoadingId(id);

      const res = await fetch(`http://localhost:5000/api/ticket/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
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

  // DELETE
 const handleDelete = async () => {
  if (!deleteId) return;

  console.log("Deleting ID:", deleteId); // 👈 check this

  try {
    const res = await fetch(
      `http://localhost:5000/api/ticket/${deleteId}`,
      {
        method: 'DELETE',
      }
    );

    const data = await res.json();

    console.log("Delete response:", data); // 👈 important

    if (data.deletedCount > 0) {
      setTickets((prev) =>
        prev.filter((t) => t._id !== deleteId)
      );
    }
  } catch (err) {
    console.error(err);
  } finally {
    setDeleteId(null);
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

      <h1 className="text-2xl font-semibold mb-6">
        Manage Vendor Tickets
      </h1>

      <div className="bg-white border rounded-2xl shadow-sm overflow-x-auto">

        <table className="min-w-full text-sm">

          <thead className="bg-gray-50 text-xs uppercase">
            <tr>
              <th className="text-left px-6 py-4">Ticket</th>
              <th className="text-left px-6 py-4">Vendor</th>
              <th className="text-left px-6 py-4">Route</th>
              <th className="text-left px-6 py-4">Price</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">

            {tickets.map((ticket) => (
              <tr key={ticket._id}>

                <td className="px-6 py-4 font-medium">
                  {ticket.title}
                </td>

                <td className="px-6 py-4">
                  <p>{ticket.vendorName}</p>
                  <p className="text-xs text-gray-500">
                    {ticket.vendorEmail}
                  </p>
                </td>

                <td className="px-6 py-4">
                  {ticket.from} → {ticket.to}
                </td>

                <td className="px-6 py-4 text-green-600 font-semibold">
                  ৳ {ticket.price}
                </td>

                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded border ${statusStyle[ticket.status]}`}>
                    {ticket.status}
                  </span>
                </td>

                <td className="px-6 py-4 flex gap-2">

                  {/* Approve */}
                  <button
                    onClick={() => updateStatus(ticket._id, 'approved')}
                    className="px-3 py-1 text-xs bg-green-600 text-white rounded"
                  >
                    <FaCheck /> Approve
                  </button>

                  {/* Reject */}
                  <button
                    onClick={() => updateStatus(ticket._id, 'rejected')}
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                  >
                    <FaTimes /> Reject
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => setDeleteId(ticket._id)}
                    className="px-3 py-1 text-xs bg-gray-700 text-white rounded"
                  >
                    <FaTrash /> Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

      {/* 🔥 DELETE CONFIRM MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80">

            <h2 className="text-lg font-semibold mb-4">
              Are you sure?
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded"
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ManageTicket;