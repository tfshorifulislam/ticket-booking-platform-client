'use client';
import { updateStatusByAdmin } from '@/lib/actions/addTicket';
import { getPendingTicket } from '@/lib/api/ticket';
import { authClient, useSession } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const statusStyle = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  approved: 'bg-green-50 text-green-700 border-green-100',
  rejected: 'bg-red-50 text-red-700 border-red-100',
};

export default function ManageTicket() {

  const { data: session } = useSession()

  if (!session) {
    redirect('/auth/login')
  }

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      //client component get token.
      const { data: userToken } = await authClient.token()
      console.log('token', userToken)

       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-all-tickets`, {
        headers: {
          authorization: `Bearer ${userToken?.token}`
        },

        cache: 'no-store'
      });

      const data = await res.json()
      setTickets(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setActionLoadingId(id);

      const data = await updateStatusByAdmin(id, status);

      if (data.modifiedCount > 0) {
        toast.success(
          `Ticket ${status === 'approved'
            ? 'approved'
            : 'rejected'
          } successfully`
        );

        // remove ticket from pending list
        setTickets((prev) =>
          prev.filter((ticket) => ticket._id !== id)
        );
      } else {
        toast.error('Failed to update ticket');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="animate-spin h-12 w-12 rounded-full border-b-2 border-green-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Manage Vendor Tickets
          </h1>

          <p className="text-slate-500 dark:text-zinc-400 mt-2">
            Approve or reject vendor submitted tickets.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-zinc-200">
                  Ticket
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-zinc-200">
                  Vendor
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-zinc-200">
                  Route
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-zinc-200">
                  Transport
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-zinc-200">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-zinc-200">
                  Seats
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-zinc-200">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-zinc-200">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {tickets.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-12 text-gray-500 dark:text-zinc-400"
                  >
                    No pending tickets found
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr
                    key={ticket._id}
                    className="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                  >
                    <td className="px-6 py-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {ticket.title || ticket.ticketTitle}
                      </h3>

                      {ticket.departure && (
                        <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                          Departure:{" "}
                          {new Date(ticket.departure).toLocaleString()}
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800 dark:text-white">
                        {ticket.vendorName}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-zinc-400">
                        {ticket.vendorEmail}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-gray-700 dark:text-zinc-300">
                      {ticket.from} → {ticket.to}
                    </td>

                    <td className="px-6 py-4 text-gray-700 dark:text-zinc-300">
                      {ticket.transport}
                    </td>

                    <td className="px-6 py-4 font-bold text-green-600 dark:text-emerald-400">
                      ৳{ticket.price}
                    </td>

                    <td className="px-6 py-4 text-gray-700 dark:text-zinc-300">
                      {ticket.ticketQuantity ||
                        ticket.availableSeats ||
                        0}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs border ${statusStyle[ticket.status]}`}
                      >
                        {ticket.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            updateStatus(ticket._id, "approved")
                          }
                          disabled={actionLoadingId === ticket._id}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm disabled:opacity-50 transition"
                        >
                          <FaCheck />
                          {actionLoadingId === ticket._id
                            ? "Loading..."
                            : "Approve"}
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(ticket._id, "rejected")
                          }
                          disabled={actionLoadingId === ticket._id}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm disabled:opacity-50 transition"
                        >
                          <FaTimes />
                          {actionLoadingId === ticket._id
                            ? "Loading..."
                            : "Reject"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet Cards */}
        <div className="lg:hidden space-y-5">
          {tickets.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-10 text-center text-gray-500 dark:text-zinc-400">
              No pending tickets found
            </div>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm"
              >
                <div className="space-y-3">

                  <div>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                      {ticket.title || ticket.ticketTitle}
                    </h2>

                    {ticket.departure && (
                      <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                        {new Date(ticket.departure).toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">

                    <div>
                      <p className="text-gray-500 dark:text-zinc-400">
                        Vendor
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {ticket.vendorName}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 dark:text-zinc-400">
                        Transport
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {ticket.transport}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 dark:text-zinc-400">
                        Route
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {ticket.from} → {ticket.to}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 dark:text-zinc-400">
                        Seats
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {ticket.ticketQuantity ||
                          ticket.availableSeats ||
                          0}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 dark:text-zinc-400">
                        Price
                      </p>
                      <p className="font-bold text-green-600 dark:text-emerald-400">
                        ৳{ticket.price}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 dark:text-zinc-400">
                        Status
                      </p>

                      <span
                        className={`inline-block mt-1 px-3 py-1 rounded-full text-xs border ${statusStyle[ticket.status]}`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                  </div>

                  <div className="flex gap-3 pt-2">

                    <button
                      onClick={() =>
                        updateStatus(ticket._id, "approved")
                      }
                      disabled={actionLoadingId === ticket._id}
                      className="flex-1 flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl disabled:opacity-50 transition"
                    >
                      <FaCheck />
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(ticket._id, "rejected")
                      }
                      disabled={actionLoadingId === ticket._id}
                      className="flex-1 flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl disabled:opacity-50 transition"
                    >
                      <FaTimes />
                      Reject
                    </button>

                  </div>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}