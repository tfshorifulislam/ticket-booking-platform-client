'use client';

import React, { useEffect, useState } from 'react';
import { authClient, useSession } from '@/lib/auth-client';
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

        // Get JWT token
        const { data: userToken } = await authClient.token();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/my-booked-tickets?email=${userEmail}`,
          {
            headers: {
              authorization: `Bearer ${userToken?.token}`,
            },
            cache: "no-store",
          }
        );

        const result = await res.json();

        console.log("API RESPONSE:", result);

        setBookings(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-4 py-1 text-sm font-medium text-green-700 dark:text-green-400">
            Dashboard
          </span>

          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            My Booked Tickets
          </h1>

          <p className="mt-2 text-slate-600 dark:text-zinc-400">
            View, manage and complete payments for your booked journeys.
          </p>
        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-16 text-center">
            <h2 className="text-2xl font-semibold text-slate-700 dark:text-zinc-200">
              No Bookings Found
            </h2>

            <p className="mt-3 text-slate-500 dark:text-zinc-400">
              You haven't booked any tickets yet.
            </p>
          </div>
        )}

        {/* Cards */}
        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
          {bookings.map((ticket) => {
            const totalPrice = Number(ticket.totalPrice) || 0;

            const departureDate = ticket.departure
              ? new Date(ticket.departure)
              : null;

            const isPast =
              departureDate && departureDate < new Date();

            const statusClass =
              statusStyle[ticket.status] ||
              "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300";

            return (
              <div
                key={ticket._id}
                className="overflow-hidden rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={ticket.image || "/placeholder.jpg"}
                    alt={ticket.ticketTitle || ticket.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                  <div className="absolute top-4 right-4">
                    <span
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold backdrop-blur-md ${statusClass}`}
                    >
                      {(ticket.status || "pending").toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">

                  <h2 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2">
                    {ticket.ticketTitle ||
                      ticket.title ||
                      "Untitled Ticket"}
                  </h2>

                  {/* Route */}
                  <div className="mt-4 flex items-center gap-2 text-slate-600 dark:text-zinc-400">
                    <FaMapMarkerAlt className="text-green-600" />
                    <span>
                      {ticket.from || "N/A"} →
                      {" "}
                      {ticket.to || "N/A"}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="mt-6 grid grid-cols-2 gap-4">

                    <div className="rounded-2xl bg-slate-50 dark:bg-zinc-800 p-4">
                      <p className="text-xs text-slate-500 dark:text-zinc-500">
                        Quantity
                      </p>

                      <h4 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                        {ticket.quantity ||
                          ticket.ticketQuantity ||
                          0}
                      </h4>
                    </div>

                    <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 p-4">
                      <p className="text-xs text-slate-500 dark:text-zinc-400">
                        Total Price
                      </p>

                      <h4 className="mt-1 text-lg font-bold text-green-600 dark:text-green-400">
                        ৳ {totalPrice}
                      </h4>
                    </div>

                  </div>

                  {/* Departure */}
                  <div className="mt-6 border-t border-slate-200 dark:border-zinc-800 pt-5">

                    <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-zinc-500">
                      Departure
                    </p>

                    <p className="mt-1 font-medium text-slate-700 dark:text-zinc-300">
                      {departureDate
                        ? departureDate.toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                        : "N/A"}
                    </p>

                  </div>

                  {/* Countdown */}
                  {departureDate && !isPast && (
                    <div className="mt-5 rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 p-4">

                      <div className="mb-2 flex items-center gap-2 text-blue-700 dark:text-blue-300">
                        <FaClock />
                        <span className="text-sm font-medium">
                          Departure Countdown
                        </span>
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
                            <span className="font-semibold text-red-500">
                              Journey Departed
                            </span>
                          ) : (
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {days}d {hours}h {minutes}m {seconds}s
                            </span>
                          )
                        }
                      />

                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-6">

                    {ticket.status === "accepted" && (
                      <form
                        action="/api/checkout_sessions"
                        method="POST"
                      >
                        <button
                          type="submit"
                          className="w-full rounded-2xl bg-green-600 hover:bg-green-700 py-3 font-semibold text-white shadow-lg shadow-green-600/20 transition"
                        >
                          Pay Now • ৳ {totalPrice}
                        </button>
                      </form>
                    )}

                    {ticket.status === "paid" && (
                      <div className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 py-3 text-center font-semibold text-green-700 dark:text-green-400">
                        ✓ Payment Completed Successfully
                      </div>
                    )}

                    {ticket.status === "rejected" && (
                      <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 py-3 text-center font-semibold text-red-600 dark:text-red-400">
                        Booking Rejected
                      </div>
                    )}

                    {ticket.status === "pending" && (
                      <div className="rounded-2xl border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 py-3 text-center font-semibold text-yellow-700 dark:text-yellow-400">
                        Waiting for Vendor Approval
                      </div>
                    )}

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookedTickets;