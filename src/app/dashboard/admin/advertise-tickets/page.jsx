'use client';

import { advertisement } from '@/lib/actions/addTicket';
import { authClient } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';
import {
  FaToggleOn,
  FaToggleOff,
  FaBullhorn,
  FaBus,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdvertiseTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // ================= FETCH =================
  const fetchTickets = async () => {
    try {
      setLoading(true);
      //client component get token.
            const { data: userToken } = await authClient.token()
            console.log(userToken)
      
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tickets`, {
              headers: {
                authorization: `Bearer ${userToken?.token}`
              },
      
              cache: 'no-store'
            });
            const data = await res.json()

      setTickets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // ================= COUNT =================

  const advertisedCount = tickets.filter(
    (ticket) => ticket.advertised
  ).length;

  // ================= TOGGLE =================

 const handleToggle = async (ticket) => {
  try {
    if (!ticket.advertised && advertisedCount >= 6) {
      toast.error('Maximum 6 advertised tickets allowed');
      return;
    }

    setUpdatingId(ticket._id);

    const data = await advertisement(
      ticket._id,
      !ticket.advertised
    );

    if (data.success || data.modifiedCount > 0) {
      setTickets((prev) =>
        prev.map((t) =>
          t._id === ticket._id
            ? {
                ...t,
                advertised: !t.advertised,
              }
            : t
        )
      );

      toast.success(
        !ticket.advertised
          ? 'Ticket advertised successfully'
          : 'Ticket unadvertised successfully'
      );
    }
  } catch (error) {
    console.error(error);
    toast.error('Failed to update advertisement');
  } finally {
    setUpdatingId(null);
  }
};

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* HEADER */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-zinc-800 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">

          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              Advertise Tickets
            </h1>

            <p className="text-slate-500 dark:text-zinc-400 mt-2">
              Control homepage advertisements
            </p>
          </div>

          <div className="bg-green-50 dark:bg-emerald-950/40 border border-green-100 dark:border-emerald-900 px-6 py-4 rounded-2xl">
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              Advertised Tickets
            </p>

            <h2 className="text-3xl font-bold text-green-600 dark:text-emerald-400">
              {advertisedCount}/6
            </h2>
          </div>

        </div>
      </div>

      {/* EMPTY */}
      {tickets.length === 0 && (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-20 text-center shadow-sm">
          <FaBullhorn className="mx-auto text-5xl text-slate-300 dark:text-zinc-600 mb-4" />

          <h2 className="text-xl font-semibold text-slate-600 dark:text-zinc-300">
            No Approved Tickets Found
          </h2>
        </div>
      )}

      {/* TABLE */}
      {tickets.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm overflow-hidden border border-gray-200 dark:border-zinc-800">

          <div className="overflow-x-auto">
            <table className="table w-full">

              <thead className="bg-green-50 dark:bg-zinc-800 border-b border-green-100 dark:border-zinc-700">
                <tr>
                  <th className="text-left py-5 px-6 font-semibold text-gray-700 dark:text-zinc-200">
                    Ticket
                  </th>

                  <th className="text-left py-5 px-6 font-semibold text-gray-700 dark:text-zinc-200">
                    Route
                  </th>

                  <th className="text-left py-5 px-6 font-semibold text-gray-700 dark:text-zinc-200">
                    Price
                  </th>

                  <th className="text-left py-5 px-6 font-semibold text-gray-700 dark:text-zinc-200">
                    Status
                  </th>

                  <th className="text-center py-5 px-6 font-semibold text-gray-700 dark:text-zinc-200">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">

                {tickets.map((ticket) => (
                  <tr
                    key={ticket._id}
                    className="hover:bg-green-50/60 dark:hover:bg-zinc-800 transition-colors duration-200"
                  >

                    {/* Ticket */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
                          <FaBus className="text-2xl text-green-600 dark:text-emerald-400" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white">
                            {ticket.title}
                          </h3>

                          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-0.5">
                            ID: {ticket._id.slice(-6)}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Route */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-zinc-300">
                        <span className="font-medium">
                          {ticket.from}
                        </span>

                        <span className="text-green-500 dark:text-emerald-400">
                          →
                        </span>

                        <span className="font-medium">
                          {ticket.to}
                        </span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-5">
                      <span className="font-bold text-2xl text-green-600 dark:text-emerald-400">
                        ৳{ticket.price}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      {ticket.advertised ? (
                        <span className="badge badge-success badge-lg px-5 py-2 font-medium">
                          ✓ Advertised
                        </span>
                      ) : (
                        <span className="badge badge-neutral badge-lg px-5 py-2 font-medium dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-200">
                          Not Active
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => handleToggle(ticket)}
                        disabled={updatingId === ticket._id}
                        className={`flex items-center gap-3 mx-auto px-5 py-2.5 rounded-2xl font-medium transition-all duration-200 disabled:opacity-50 ${
                          ticket.advertised
                            ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                            : "text-green-600 dark:text-emerald-400 hover:bg-green-50 dark:hover:bg-emerald-950/30"
                        }`}
                      >
                        {ticket.advertised ? (
                          <>
                            <FaToggleOn className="text-4xl text-green-600 dark:text-emerald-400" />
                            <span>Unadvertise</span>
                          </>
                        ) : (
                          <>
                            <FaToggleOff className="text-4xl text-gray-400 dark:text-zinc-500" />
                            <span>Advertise</span>
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
      )}
    </div>
  </div>
);
};

export default AdvertiseTicketsPage;