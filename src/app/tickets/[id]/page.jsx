'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  FaBus,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaArrowLeft,
  FaTicketAlt,
} from 'react-icons/fa';

const TicketDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const [countdown, setCountdown] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // ================= FETCH =================
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/ticket/${id}`);
        const data = await res.json();
        setTicket(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTicket();
  }, [id]);

  // ================= COUNTDOWN =================
  useEffect(() => {
    if (!ticket) return;

    const interval = setInterval(() => {
      const target = new Date(`${ticket.date} ${ticket.time}`);
      const now = new Date();

      const diff = target - now;

      if (diff <= 0) {
        setCountdown('Departed');
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket]);

  // ================= STATES =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading ticket...
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Ticket not found
      </div>
    );
  }

  const departureTime = new Date(`${ticket.date} ${ticket.time}`);
  const isPast = departureTime < new Date();
  const isSoldOut = ticket.quantity === 0;
  const isDisabled = isPast || isSoldOut;

  // ================= BOOK =================
  const handleBooking = async (e) => {
    e.preventDefault();

    if (qty > ticket.quantity) {
      alert('Quantity exceeds available seats!');
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch('http://localhost:5000/api/book-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: ticket._id,
          quantity: qty,
          status: 'Pending',
        }),
      });

      const data = await res.json();

      if (data.insertedId || data.success) {
        alert('Booking successful!');
        setIsModalOpen(false);
        setQty(1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* BACK */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* IMAGE */}
          <img
            src={ticket.image}
            className="w-full h-72 object-cover"
          />

          {/* CONTENT */}
          <div className="p-6 space-y-5">

            {/* TITLE */}
            <h1 className="text-3xl font-bold text-gray-800">
              {ticket.title}
            </h1>

            {/* ROUTE */}
            <div className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt />
              {ticket.from} → {ticket.to}
            </div>

            {/* TYPE */}
            <div className="flex items-center gap-2 text-gray-600">
              <FaBus />
              {ticket.transport}
            </div>

            {/* PRICE + SEATS */}
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold text-green-600">
                ৳ {ticket.price}
              </p>

              <p className="text-sm text-gray-500">
                Seats: <span className="font-semibold">{ticket.quantity}</span>
              </p>
            </div>

            {/* COUNTDOWN */}
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm">
              ⏳ Departure: <span className="font-semibold">{countdown}</span>
            </div>

            {/* STATUS BADGE */}
            <div className="flex flex-wrap gap-2">
              {ticket.perks?.map((p, i) => (
                <span
                  key={i}
                  className="bg-green-50 text-green-700 px-3 py-1 text-xs rounded-full"
                >
                  <FaTag className="inline mr-1" />
                  {p}
                </span>
              ))}
            </div>

            {/* BOOK BUTTON */}
            <button
              disabled={isDisabled}
              onClick={() => setIsModalOpen(true)}
              className={`w-full py-3 rounded-xl font-semibold text-white transition
                ${isDisabled
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
                }`}
            >
              {isPast
                ? 'Already Departed'
                : isSoldOut
                  ? 'Sold Out'
                  : 'Book Now'}
            </button>

          </div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">

            <div className="flex items-center gap-2 mb-4">
              <FaTicketAlt className="text-green-600" />
              <h2 className="text-xl font-bold">Book Ticket</h2>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">

              <input
                type="number"
                min={1}
                max={ticket.quantity}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
              />

              <div className="flex gap-2">

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  disabled={submitting}
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  {submitting ? 'Booking...' : 'Confirm'}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetailsPage;