'use client';

import React, { useEffect, useMemo, useState } from 'react';
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
import { getAllTickets } from '@/lib/api/ticket';
import Loading from '../loading';

const ITEMS_PER_PAGE = 12;

const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    // ================= FETCH ONLY APPROVED TICKETS =================
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await getAllTickets();

                console.log(data); // check

                setTickets(data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);
    // ================= FILTER =================
    const filteredTickets = useMemo(() => {
        return tickets.filter((ticket) => {
            const q = searchQuery.toLowerCase();

            const matchSearch =
                ticket.title?.toLowerCase().includes(q) ||
                ticket.from?.toLowerCase().includes(q) ||
                ticket.to?.toLowerCase().includes(q);

            const matchFilter =
                filter === 'all' || ticket.transport === filter;

            return matchSearch && matchFilter;
        });
    }, [searchQuery, filter, tickets]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filter]);

    const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);

    const paginatedTickets = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredTickets.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredTickets, currentPage]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
    };

    const handleClear = () => {
        setSearchInput('');
        setSearchQuery('');
        setFilter('all');
    };

    if (loading) {
        return (
            <Loading/>
        );
    }

    return (
        <div className="w-11/12 max-w-7xl mx-auto py-10">

            {/* HEADER */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    All Tickets
                </h1>
                <p className="text-gray-500">
                    Browse tickets
                </p>
            </div>

            {/* SEARCH + FILTER */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">

                <form
                    onSubmit={handleSearch}
                    className="flex items-center w-full bg-white border rounded-xl px-3 py-2 shadow-sm"
                >
                    <FaSearch className="text-gray-400" />

                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search route, title..."
                        className="w-full px-3 outline-none"
                    />

                    <button className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm">
                        Search
                    </button>

                    <button
                        type="button"
                        onClick={handleClear}
                        className="ml-2 bg-gray-200 px-3 py-1.5 rounded-lg text-sm"
                    >
                        Clear
                    </button>
                </form>

                <div className="bg-white border rounded-xl px-3 py-2 shadow-sm w-full sm:w-72">
                    <FilterBox value={filter} onChange={setFilter} />
                </div>
            </div>

            {/* GRID */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {paginatedTickets.map((ticket) => (
                    <div
                        key={ticket._id}
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
                                {ticket.perks?.map((p, i) => (
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
                                {ticket.dateTime}
                                <FaClock className="ml-2" />
                            </p>

                            <Link
                                href={`/tickets/${ticket._id}`}
                                className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                            >
                                See Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

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