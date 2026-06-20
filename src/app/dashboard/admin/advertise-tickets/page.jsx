'use client';

import React, { useEffect, useState } from 'react';
import {
  FaToggleOn,
  FaToggleOff,
  FaBullhorn,
  FaBus,
} from 'react-icons/fa';

const AdvertiseTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // ================= FETCH =================

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        'http://localhost:5000/api/approved-tickets'
      );

      const data = await res.json();

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
        alert('Maximum 6 advertised tickets allowed');
        return;
      }

      setUpdatingId(ticket._id);

      const res = await fetch(
        `http://localhost:5000/api/advertise-ticket/${ticket._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            advertised: !ticket.advertised,
          }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0 || data.success) {
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
      }
    } catch (error) {
      console.error(error);
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
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden border">

            <div className="overflow-x-auto">

              <table className="table">

                <thead className="bg-green-50">

                  <tr>

                    <th>Ticket</th>

                    <th>Route</th>

                    <th>Price</th>

                    <th>Status</th>

                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {tickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="hover:bg-green-50/30"
                    >
                      <td>

                        <div className="flex items-center gap-3">

                          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <FaBus className="text-green-600" />
                          </div>

                          <div>
                            <h3 className="font-semibold">
                              {ticket.title}
                            </h3>
                          </div>

                        </div>

                      </td>

                      <td>
                        {ticket.from} → {ticket.to}
                      </td>

                      <td className="font-bold text-green-600">
                        ৳ {ticket.price}
                      </td>

                      <td>

                        {ticket.advertised ? (
                          <span className="badge badge-success badge-lg">
                            Advertised
                          </span>
                        ) : (
                          <span className="badge badge-neutral badge-lg">
                            Not Active
                          </span>
                        )}

                      </td>

                      <td>

                        <button
                          onClick={() => handleToggle(ticket)}
                          disabled={updatingId === ticket._id}
                          className="flex items-center gap-2 font-medium"
                        >
                          {ticket.advertised ? (
                            <>
                              <FaToggleOn className="text-4xl text-green-600" />
                              Unadvertise
                            </>
                          ) : (
                            <>
                              <FaToggleOff className="text-4xl text-slate-400" />
                              Advertise
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