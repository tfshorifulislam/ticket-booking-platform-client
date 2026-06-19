'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  FaBus,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaArrowLeft
} from 'react-icons/fa';

const TicketDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const [countdown, setCountdown] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qty, setQty] = useState(1);

  // ================= FETCH TICKET =================
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
    return <p className="text-center py-10">Loading...</p>;
  }

  if (!ticket) {
    return <p className="text-center py-10">Ticket not found</p>;
  }

  const departureTime = new Date(`${ticket.date} ${ticket.time}`);
  const isPast = departureTime < new Date();
  const isSoldOut = ticket.quantity === 0;

  const isDisabled = isPast || isSoldOut;

  // ================= BOOKING =================
  const handleBooking = async (e) => {
    e.preventDefault();

    if (qty > ticket.quantity) {
      alert('Quantity exceeds available seats!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/book-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ticketId: ticket._id,
          quantity: qty,
          status: 'Pending'
        })
      });

      const data = await res.json();

      if (data.insertedId || data.success) {
        alert('Booking successful (Pending)');
        setIsModalOpen(false);
        setQty(1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-11/12 max-w-5xl mx-auto py-10">

      {/* BACK */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 text-gray-600"
      >
        <FaArrowLeft />
        Back
      </button>

      {/* IMAGE */}
      <img
        src={ticket.image}
        className="w-full h-72 object-cover rounded-2xl"
      />

      {/* INFO */}
      <div className="mt-6 space-y-4">

        <h1 className="text-3xl font-bold">{ticket.title}</h1>

        <p className="flex items-center gap-2">
          <FaMapMarkerAlt />
          {ticket.from} → {ticket.to}
        </p>

        <p className="flex items-center gap-2">
          <FaBus />
          {ticket.transport}
        </p>

        <p className="text-green-600 text-xl font-bold">
          ৳ {ticket.price}
        </p>

        <p>Available: {ticket.quantity}</p>

        {/* COUNTDOWN */}
        <p className="text-blue-600 font-semibold">
          ⏳ {countdown}
        </p>

        {/* BUTTON */}
        <button
          disabled={isDisabled}
          onClick={() => setIsModalOpen(true)}
          className={`px-6 py-3 rounded-xl text-white ${
            isDisabled
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

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-xl font-bold mb-4">Book Ticket</h2>

            <form onSubmit={handleBooking} className="space-y-4">

              <input
                type="number"
                min={1}
                max={ticket.quantity}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full border px-3 py-2 rounded"
              />

              <div className="flex justify-end gap-2">

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Confirm
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