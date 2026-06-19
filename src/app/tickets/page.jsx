'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import {
    FaBus,
    FaSearch,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaClock,
    FaTag,
} from 'react-icons/fa';
import { FilterBox } from '@/component/PublicComponents/FilterBox';

// ================= DATA =================
const ticketsData = [
    {
        id: 1,
        title: 'Dhaka to Chittagong Express',
        from: 'Dhaka',
        to: 'Chittagong',
        transport: 'Bus',
        price: 1200,
        quantity: 35,
        perks: ['AC', 'WiFi', 'Snacks'],
        date: '2026-06-25',
        time: '08:30 AM',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'
    },
    {
        id: 2,
        title: 'Sylhet Luxury Ride',
        from: 'Dhaka',
        to: 'Sylhet',
        transport: 'Bus',
        price: 1500,
        quantity: 20,
        perks: ['AC', 'Recliner Seat'],
        date: '2026-06-26',
        time: '09:00 PM',
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a'
    },
    {
        id: 3,
        title: 'Cox’s Bazar Night Trip',
        from: 'Dhaka',
        to: 'Cox’s Bazar',
        transport: 'Bus',
        price: 1800,
        quantity: 40,
        perks: ['AC', 'Blanket'],
        date: '2026-06-27',
        time: '10:00 PM',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'
    },
    {
        id: 4,
        title: 'Dhaka to Rajshahi Super Deluxe',
        from: 'Dhaka',
        to: 'Rajshahi',
        transport: 'Bus',
        price: 1100,
        quantity: 30,
        perks: ['AC', 'WiFi'],
        date: '2026-06-28',
        time: '07:45 AM',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'
    },
    {
        id: 5,
        title: 'Chittagong to Sylhet Express',
        from: 'Chittagong',
        to: 'Sylhet',
        transport: 'Bus',
        price: 1450,
        quantity: 25,
        perks: ['AC', 'Snacks'],
        date: '2026-06-29',
        time: '11:30 PM',
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a'
    },
    {
        id: 6,
        title: 'Barisal to Dhaka Morning Star',
        from: 'Barisal',
        to: 'Dhaka',
        transport: 'Bus',
        price: 850,
        quantity: 45,
        perks: ['AC'],
        date: '2026-06-30',
        time: '06:00 AM',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'
    },
    {
        id: 7,
        title: 'Khulna to Cox’s Bazar VIP',
        from: 'Khulna',
        to: 'Cox’s Bazar',
        transport: 'Bus',
        price: 1950,
        quantity: 18,
        perks: ['AC', 'WiFi', 'Recliner Seat', 'Snacks'],
        date: '2026-07-01',
        time: '08:00 PM',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'
    },
    {
        id: 8,
        title: 'Rangpur to Dhaka Night Coach',
        from: 'Rangpur',
        to: 'Dhaka',
        transport: 'Bus',
        price: 1050,
        quantity: 32,
        perks: ['AC', 'Blanket'],
        date: '2026-07-02',
        time: '10:15 PM',
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a'
    },
    {
        id: 9,
        title: 'Dhaka to Bogra Green Line',
        from: 'Dhaka',
        to: 'Bogra',
        transport: 'Bus',
        price: 950,
        quantity: 38,
        perks: ['AC', 'WiFi'],
        date: '2026-07-03',
        time: '09:30 AM',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'
    },
    {
        id: 10,
        title: 'Sylhet to Chittagong Hill Express',
        from: 'Sylhet',
        to: 'Chittagong',
        transport: 'Bus',
        price: 1350,
        quantity: 22,
        perks: ['AC', 'Snacks'],
        date: '2026-07-04',
        time: '07:00 PM',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'
    },
    {
        id: 11,
        title: 'Dhaka to Khulna Royal Deluxe',
        from: 'Dhaka',
        to: 'Khulna',
        transport: 'Bus',
        price: 1250,
        quantity: 28,
        perks: ['AC', 'WiFi', 'Snacks'],
        date: '2026-07-05',
        time: '08:15 AM',
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a'
    },
    {
        id: 12,
        title: 'Cox’s Bazar to Dhaka Night Rider',
        from: 'Cox’s Bazar',
        to: 'Dhaka',
        transport: 'Bus',
        price: 1750,
        quantity: 33,
        perks: ['AC', 'Recliner Seat'],
        date: '2026-07-06',
        time: '09:45 PM',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'
    },
    {
        id: 13,
        title: 'Rajshahi to Sylhet Super Express',
        from: 'Rajshahi',
        to: 'Sylhet',
        transport: 'Bus',
        price: 1550,
        quantity: 24,
        perks: ['AC', 'Blanket', 'WiFi'],
        date: '2026-07-07',
        time: '11:00 PM',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'
    },
    {
        id: 14,
        title: 'Bogra to Chittagong Morning Bus',
        from: 'Bogra',
        to: 'Chittagong',
        transport: 'Bus',
        price: 1150,
        quantity: 40,
        perks: ['AC'],
        date: '2026-07-08',
        time: '06:30 AM',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'
    },
    {
        id: 15,
        title: 'Dhaka to Barisal VIP Coach',
        from: 'Dhaka',
        to: 'Barisal',
        transport: 'Bus',
        price: 900,
        quantity: 42,
        perks: ['AC', 'Snacks'],
        date: '2026-07-09',
        time: '07:20 AM',
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a'
    },
    {
        id: 16,
        title: 'Chittagong to Rangpur Express',
        from: 'Chittagong',
        to: 'Rangpur',
        transport: 'Bus',
        price: 1650,
        quantity: 19,
        perks: ['AC', 'WiFi', 'Recliner Seat'],
        date: '2026-07-10',
        time: '10:30 PM',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'
    },
    {
        id: 17,
        title: 'Sylhet to Khulna Luxury',
        from: 'Sylhet',
        to: 'Khulna',
        transport: 'Bus',
        price: 1700,
        quantity: 26,
        perks: ['AC', 'Blanket', 'Snacks'],
        date: '2026-07-11',
        time: '08:50 PM',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'
    },
    {
        id: 18,
        title: 'Cox’s Bazar to Rajshahi',
        from: 'Cox’s Bazar',
        to: 'Rajshahi',
        transport: 'Bus',
        price: 2100,
        quantity: 15,
        perks: ['AC', 'WiFi', 'Recliner Seat'],
        date: '2026-07-12',
        time: '09:15 PM',
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a'
    },
    {
        id: 19,
        title: 'Dhaka to Rangpur Green Line',
        from: 'Dhaka',
        to: 'Rangpur',
        transport: 'Bus',
        price: 1150,
        quantity: 36,
        perks: ['AC', 'WiFi'],
        date: '2026-07-13',
        time: '07:30 AM',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'
    },
    {
        id: 20,
        title: 'Khulna to Sylhet Deluxe',
        from: 'Khulna',
        to: 'Sylhet',
        transport: 'Flight',
        price: 1600,
        quantity: 23,
        perks: ['AC', 'Snacks'],
        date: '2026-07-14',
        time: '11:45 PM',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee'
    },
    // Continuing up to 50...
    {
        id: 50,
        title: 'Barisal to Cox’s Bazar Super Deluxe',
        from: 'Barisal',
        to: 'Cox’s Bazar',
        transport: 'Train',
        price: 1650,
        quantity: 29,
        perks: ['AC', 'WiFi', 'Snacks', 'Blanket'],
        date: '2026-07-25',
        time: '08:00 PM',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957'
    }
];

// ================= PAGE =================
const ITEMS_PER_PAGE = 6;

const AllTickets = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    // ================= FILTER =================
    const filteredTickets = useMemo(() => {
        return ticketsData.filter((ticket) => {
            const q = searchQuery.toLowerCase();

            const matchSearch =
                ticket.title.toLowerCase().includes(q) ||
                ticket.from.toLowerCase().includes(q) ||
                ticket.to.toLowerCase().includes(q);

            const matchFilter =
                filter === 'all' || ticket.transport === filter;

            return matchSearch && matchFilter;
        });
    }, [searchQuery, filter]);

    // reset page on filter/search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filter]);

    // ================= PAGINATION =================
    const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);

    const paginatedTickets = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredTickets.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredTickets, currentPage]);

    // ================= HANDLERS =================
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
    };

    const handleClear = () => {
        setSearchInput('');
        setSearchQuery('');
        setFilter('all');
    };

    return (
        <div className="w-11/12 max-w-7xl mx-auto py-10">

            {/* HEADER */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    All Tickets
                </h1>
                <p className="text-gray-500">
                    Search, filter and book your journey
                </p>
            </div>

            {/* SEARCH + FILTER */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">

                {/* SEARCH */}
                <form
                    onSubmit={handleSearch}
                    className="flex items-center w-full bg-white border rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-green-500"
                >
                    <FaSearch className="text-gray-400" />

                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search route, title..."
                        className="w-full px-3 outline-none"
                    />

                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-green-700"
                    >
                        Search
                    </button>

                    <button
                        type="button"
                        onClick={handleClear}
                        className="ml-2 bg-gray-200 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-300"
                    >
                        Clear
                    </button>
                </form>

                {/* PREMIUM FILTER */}
                <div className="bg-white border rounded-xl px-3 py-2 shadow-sm w-full sm:w-72">
                   <FilterBox value={filter} onChange={setFilter} />
                </div>
            </div>

            {/* GRID */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedTickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
                    >
                        <img
                            src={ticket.image}
                            className="h-40 w-full object-cover"
                        />

                        <div className="p-5 space-y-3">

                            <h2 className="font-bold text-gray-800">
                                {ticket.title}
                            </h2>

                            <p className="flex items-center gap-2 text-sm text-gray-600">
                                <FaMapMarkerAlt />
                                {ticket.from} → {ticket.to}
                            </p>

                            <p className="flex items-center gap-2 text-sm text-gray-500">
                                <FaBus />
                                {ticket.transport}
                            </p>

                            <div className="flex justify-between">
                                <span className="text-green-600 font-bold">
                                    ৳ {ticket.price}
                                </span>
                                <span className="text-sm text-gray-500">
                                    Seats: {ticket.quantity}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {ticket.perks.map((p, i) => (
                                    <span
                                        key={i}
                                        className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full"
                                    >
                                        <FaTag className="inline mr-1" />
                                        {p}
                                    </span>
                                ))}
                            </div>

                            <p className="text-xs text-gray-500 flex items-center gap-2">
                                <FaCalendarAlt />
                                {ticket.date}
                                <FaClock className="ml-2" />
                                {ticket.time}
                            </p>

                            <Link
                                href={`/tickets/${ticket.id}`}
                                className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                            >
                                See Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* EMPTY STATE */}
            {paginatedTickets.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                    No tickets found
                </p>
            )}

            {/* PAGINATION */}
            <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-lg border ${currentPage === i + 1
                            ? 'bg-green-600 text-white'
                            : 'bg-white'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllTickets;