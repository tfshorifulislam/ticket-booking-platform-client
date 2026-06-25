'use client';


import { updateStatusByAdmin } from '@/lib/actions/addTicket';
import { getPendingTicket } from '@/lib/api/ticket';
import { useSession } from '@/lib/auth-client';
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
      const data = await getPendingTicket();
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
          `Ticket ${
            status === 'approved'
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
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg font-medium">
          Loading tickets...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Manage Vendor Tickets
        </h1>
        <p className="text-gray-500 mt-1">
          Approve or reject vendor submitted tickets.
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl border shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Ticket
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Vendor
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Route
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Transport
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Seats
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-12 text-gray-500"
                >
                  No pending tickets found
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr
                  key={ticket._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="font-medium">
                        {ticket.title ||
                          ticket.ticketTitle}
                      </h3>

                      {ticket.departure && (
                        <p className="text-xs text-gray-500">
                          Departure:{' '}
                          {new Date(
                            ticket.departure
                          ).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-medium">
                      {ticket.vendorName}
                    </p>

                    <p className="text-xs text-gray-500">
                      {ticket.vendorEmail}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    {ticket.from} → {ticket.to}
                  </td>

                  <td className="px-6 py-4">
                    {ticket.transport}
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    ৳{ticket.price}
                  </td>

                  <td className="px-6 py-4">
                    {ticket.ticketQuantity ||
                      ticket.availableSeats ||
                      0}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs border ${
                        statusStyle[ticket.status]
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          updateStatus(
                            ticket._id,
                            'approved'
                          )
                        }
                        disabled={
                          actionLoadingId === ticket._id
                        }
                        className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700 disabled:opacity-50"
                      >
                        <FaCheck />
                        {actionLoadingId === ticket._id
                          ? 'Loading...'
                          : 'Approve'}
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            ticket._id,
                            'rejected'
                          )
                        }
                        disabled={
                          actionLoadingId === ticket._id
                        }
                        className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 disabled:opacity-50"
                      >
                        <FaTimes />
                        {actionLoadingId === ticket._id
                          ? 'Loading...'
                          : 'Reject'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}