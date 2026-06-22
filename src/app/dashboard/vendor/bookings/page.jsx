'use client';

import { getRequestBooking } from '@/lib/api/ticket';
import { useSession } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const BookingsPageVendor = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const {data:session , isPending } = useSession()
  // ================= FETCH =================
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);

        const data = await getRequestBooking(session?.user?.email);

        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchBookings();
    }
  }, [session]);

  // ================= ACCEPT =================
  const handleAccept = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/vendor-booking/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'accepted' }),
      });

      const data = await res.json();

      console.log('PATCH RESPONSE:', data);

      if (data.success || data.modifiedCount || data.acknowledged) {
        setBookings(prev =>
          prev.map(b =>
            (b._id === id || b.id === id)
              ? { ...b, status: 'accepted' }
              : b
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };
  // ================= REJECT =================
  const handleReject = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/vendor-booking/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'rejected' }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === id ? { ...b, status: 'rejected' } : b
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading bookings...
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-2xl font-semibold mb-6">
        Booking Requests
      </h1>

      {/* EMPTY STATE */}
      {bookings.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No booking requests found
        </div>
      ) : (

        <div className="bg-white border rounded-2xl overflow-x-auto">

          <table className="min-w-full text-sm">

            <thead className="bg-gray-50 text-xs uppercase">
              <tr>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Ticket</th>
                <th className="px-6 py-4 text-left">Qty</th>
                <th className="px-6 py-4 text-left">Total</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">

              {bookings.map((b) => {
                const total = (b.quantity || 0) * (b.unitPrice || 0);

                return (
                  <tr key={b._id} className="hover:bg-gray-50">

                    {/* USER */}
                    <td className="px-6 py-4">
                      <p className="font-medium">
                        {b.userName || 'Unknown'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {b.userEmail || 'No email'}
                      </p>
                    </td>

                    {/* TICKET */}
                    <td className="px-6 py-4">
                      {b.ticketTitle || 'No title'}
                    </td>

                    {/* QTY */}
                    <td className="px-6 py-4">
                      {b.quantity || 0}
                    </td>

                    {/* TOTAL */}
                    <td className="px-6 py-4 font-semibold text-green-600">
                      ৳ {total}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() => handleAccept(b._id)}
                          disabled={b.status !== 'pending'}
                          className="px-3 py-1 text-xs bg-green-600 text-white rounded disabled:opacity-40"
                        >
                          <FaCheck /> Accept
                        </button>

                        <button
                          onClick={() => handleReject(b._id)}
                          disabled={b.status !== 'pending'}
                          className="px-3 py-1 text-xs bg-red-600 text-white rounded disabled:opacity-40"
                        >
                          <FaTimes /> Reject
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default BookingsPageVendor;