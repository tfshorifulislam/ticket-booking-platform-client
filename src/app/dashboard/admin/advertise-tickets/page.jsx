'use client';

import { advertisement } from '@/lib/actions/addTicket';
import { getAllTickets } from '@/lib/api/ticket';
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
      const data = await getAllTickets();

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
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* HEADER */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border mb-8">

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Advertise Tickets
              </h1>

              <p className="text-slate-500 mt-2">
                Control homepage advertisements
              </p>
            </div>

            <div className="bg-green-50 px-6 py-4 rounded-2xl border border-green-100">

              <p className="text-sm text-slate-500">
                Advertised Tickets
              </p>

              <h2 className="text-3xl font-bold text-green-600">
                {advertisedCount}/6
              </h2>

            </div>

          </div>

        </div>

        {/* EMPTY */}

        {tickets.length === 0 && (
          <div className="bg-white rounded-3xl p-20 text-center shadow-sm">
            <FaBullhorn className="mx-auto text-5xl text-slate-300 mb-4" />

            <h2 className="text-xl font-semibold text-slate-600">
              No Approved Tickets Found
            </h2>
          </div>
        )}

        {/* TABLE */}

        {tickets.length > 0 && (
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-green-50 border-b border-green-100">
                  <tr>
                    <th className="text-left py-5 px-6 font-semibold text-gray-700">Ticket</th>
                    <th className="text-left py-5 px-6 font-semibold text-gray-700">Route</th>
                    <th className="text-left py-5 px-6 font-semibold text-gray-700">Price</th>
                    <th className="text-left py-5 px-6 font-semibold text-gray-700">Status</th>
                    <th className="text-center py-5 px-6 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="hover:bg-green-50/50 transition-colors duration-200"
                    >
                      {/* Ticket Column */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
                            <FaBus className="text-2xl text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{ticket.title}</h3>
                            <p className="text-sm text-gray-500 mt-0.5">ID: {ticket._id.slice(-6)}</p>
                          </div>
                        </div>
                      </td>

                      {/* Route */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-gray-700">
                          <span className="font-medium">{ticket.from}</span>
                          <span className="text-green-500">→</span>
                          <span className="font-medium">{ticket.to}</span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-5">
                        <span className="font-bold text-2xl text-green-600">
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
                          <span className="badge badge-neutral badge-lg px-5 py-2 font-medium">
                            Not Active
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => handleToggle(ticket)}
                          disabled={updatingId === ticket._id}
                          className={`flex items-center gap-3 mx-auto font-medium transition-all duration-200 px-5 py-2.5 rounded-2xl ${ticket.advertised
                            ? "text-red-600 hover:bg-red-50"
                            : "text-green-600 hover:bg-green-50"
                            } disabled:opacity-50`}
                        >
                          {ticket.advertised ? (
                            <>
                              <FaToggleOn className="text-4xl text-green-600" />
                              <span>Unadvertise</span>
                            </>
                          ) : (
                            <>
                              <FaToggleOff className="text-4xl text-gray-400" />
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