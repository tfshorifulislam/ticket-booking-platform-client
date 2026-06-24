'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { getUserAddedTicket } from '@/lib/api/ticket';
import {
  FaMapMarkerAlt,
  FaClock,
} from 'react-icons/fa';
import Countdown from 'react-countdown';

const statusStyle = {
  pending: 'bg-amber-100 text-amber-700 border border-amber-200',
  accepted: 'bg-sky-100 text-sky-700 border border-sky-200',
  rejected: 'bg-rose-100 text-rose-700 border border-rose-200',
  paid: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
};

const BookedTickets = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending } = useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    if (isPending) return;

    if (!userEmail) {
      setBookings([]);
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);

        const result = await getUserAddedTicket(userEmail);

        setBookings(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail, isPending]);

  if (loading || isPending) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <p className="text-gray-500">Loading your bookings...</p>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center bg-white rounded-3xl border">
        <p className="text-xl text-gray-500">
          You haven't booked any tickets yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">
        My Booked Tickets
      </h1>

      <p className="text-gray-600 mb-8">
        Manage all your booked journeys
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bookings.map((ticket) => {
          const totalPrice = Number(ticket.totalPrice) || 0;

          const departureDate = ticket.departure
            ? new Date(ticket.departure)
            : null;

          const isPast =
            departureDate && departureDate < new Date();

          const statusClass =
            statusStyle[ticket.status] ||
            'bg-gray-100 text-gray-600 border border-gray-200';

          return (
            <div
              key={ticket._id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={ticket.image || '/placeholder.jpg'}
                  alt={
                    ticket.ticketTitle ||
                    ticket.title ||
                    'Ticket'
                  }
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 right-4">
                  <span
                    className={`text-xs px-4 py-1.5 rounded-full font-semibold ${statusClass}`}
                  >
                    {(ticket.status || 'pending').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-4">
                {/* TITLE */}
                <h2 className="text-lg font-bold line-clamp-2">
                  {ticket.ticketTitle ||
                    ticket.title ||
                    'Untitled Ticket'}
                </h2>

                {/* ROUTE */}
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaMapMarkerAlt className="text-emerald-600" />
                  <span>
                    {ticket.from || 'N/A'} →{' '}
                    {ticket.to || 'N/A'}
                  </span>
                </div>

                {/* PRICE & QUANTITY */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">
                      Quantity
                    </p>

                    <p className="font-semibold">
                      {ticket.quantity ||
                        ticket.ticketQuantity ||
                        0}{' '}
                      Tickets
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      Total Price
                    </p>

                    <p className="text-xl font-bold text-emerald-600">
                      ৳ {totalPrice}
                    </p>
                  </div>
                </div>

                {/* DEPARTURE */}
                <div>
                  <p className="text-xs text-gray-500">
                    Departure
                  </p>

                  <p className="text-sm font-medium">
                    {departureDate
                      ? departureDate.toLocaleString('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })
                      : 'N/A'}
                  </p>
                </div>

                {/* COUNTDOWN */}
                {departureDate && !isPast && (
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2 text-gray-600 text-sm">
                      <FaClock />
                      <span>Countdown</span>
                    </div>

                    <Countdown
                      date={departureDate}
                      renderer={({
                        days,
                        hours,
                        minutes,
                        seconds,
                        completed,
                      }) =>
                        completed ? (
                          <span className="text-red-500 font-semibold">
                            Departed
                          </span>
                        ) : (
                          <span className="text-blue-600 font-bold text-lg">
                            {days}d {hours}h {minutes}m{' '}
                            {seconds}s
                          </span>
                        )
                      }
                    />
                  </div>
                )}

                {/* ACTIONS */}
                {ticket.status === 'accepted' && (
                  <form action="/api/checkout_sessions" method="POST">
                    <section>
                      <button type="submit" role="link" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-semibold transition">
                        Pay Now - ৳ {totalPrice}
                      </button>
                    </section>
                  </form>
                )}

                {ticket.status === 'paid' && (
                  <div className="text-center text-emerald-600 font-semibold py-2">
                    ✓ Payment Completed Successfully
                  </div>
                )}

                {ticket.status === 'rejected' && (
                  <div className="text-center text-rose-600 font-semibold py-2">
                    Booking Rejected
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookedTickets;