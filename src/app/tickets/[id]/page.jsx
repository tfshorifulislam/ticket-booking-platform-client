'use client';

import React, { useEffect, useMemo, useState } from 'react';
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

    const ticket = useMemo(() => {
        return ticketsData.find(t => t.id === Number(id));
    }, [id]);

    const [countdown, setCountdown] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [qty, setQty] = useState(1);

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

    if (!ticket) {
        return (
            <div className="text-center py-20 text-gray-500">
                Ticket not found
            </div>
        );
    }

    // ================= STATUS LOGIC =================
    const departureTime = new Date(`${ticket.date} ${ticket.time}`);
    const isPast = departureTime < new Date();
    const isSoldOut = ticket.quantity === 0;

    const isDisabled = isPast || isSoldOut;

    // ================= BOOK HANDLER =================
    const handleBooking = (e) => {
        e.preventDefault();

        if (qty > ticket.quantity) {
            alert('Quantity exceeds available seats!');
            return;
        }

        // 🔥 mock save (replace with API call)
        const booking = {
            ticketId: ticket.id,
            quantity: qty,
            status: 'Pending'
        };

        console.log('BOOKING SAVED:', booking);

        alert('Booking successful (Pending)');

        setIsModalOpen(false);
        setQty(1);
    };

    return (
        <div className="w-11/12 max-w-5xl mx-auto py-10">

            {/* BACK */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
            >
                <FaArrowLeft />
                Back
            </button>

            {/* IMAGE */}
            <div className="rounded-2xl overflow-hidden shadow">
                <img
                    src={ticket.image}
                    className="w-full h-72 object-cover"
                />
            </div>

            {/* INFO */}
            <div className="mt-6 space-y-4">

                <h1 className="text-3xl font-bold text-gray-800">
                    {ticket.title}
                </h1>

                <p className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt />
                    {ticket.from} → {ticket.to}
                </p>

                <p className="flex items-center gap-2 text-gray-600">
                    <FaBus />
                    {ticket.transport}
                </p>

                <p className="text-green-600 font-bold text-xl">
                    ৳ {ticket.price}
                </p>

                <p className="text-gray-500">
                    Available Seats: {ticket.quantity}
                </p>

                {/* PERKS */}
                <div className="flex flex-wrap gap-2">
                    {ticket.perks.map((p, i) => (
                        <span
                            key={i}
                            className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                        >
                            <FaTag className="inline mr-1" />
                            {p}
                        </span>
                    ))}
                </div>

                {/* DATE TIME */}
                <div className="flex items-center gap-6 text-gray-600">
                    <span className="flex items-center gap-2">
                        <FaCalendarAlt />
                        {ticket.date}
                    </span>

                    <span className="flex items-center gap-2">
                        <FaClock />
                        {ticket.time}
                    </span>
                </div>

                {/* COUNTDOWN */}
                <div className="text-lg font-semibold text-blue-600">
                    ⏳ Departure in: {countdown}
                </div>

                {/* BOOK BUTTON */}
                <button
                    disabled={isDisabled}
                    onClick={() => setIsModalOpen(true)}
                    className={`px-6 py-3 rounded-xl text-white font-semibold transition
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

            {/* ================= MODAL ================= */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md">

                        <h2 className="text-xl font-bold mb-4">
                            Book Ticket
                        </h2>

                        <form onSubmit={handleBooking} className="space-y-4">

                            <div>
                                <label className="text-sm text-gray-600">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    max={ticket.quantity}
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                    className="w-full border px-3 py-2 rounded-lg mt-1"
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
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