'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
    Select,
    SelectItem,
} from "@heroui/react";

import {
    FaBus,
    FaSearch,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaClock,
    FaTag,
    FaSortAmountDown,
} from 'react-icons/fa';
import { FilterBox } from '@/component/PublicComponents/FilterBox';
import { getAllTickets } from '@/lib/api/ticket';
import Loading from '../loading';

const ITEMS_PER_PAGE = 9;

const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('default'); // New State: 'default', 'price-asc', 'price-desc'
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

    // ================= FILTER & SORT =================
    const filteredAndSortedTickets = useMemo(() => {
        // 1. Filter Tickets
        const result = tickets.filter((ticket) => {
            const q = searchQuery.toLowerCase();

            const matchSearch =
                ticket.title?.toLowerCase().includes(q) ||
                ticket.from?.toLowerCase().includes(q) ||
                ticket.to?.toLowerCase().includes(q);

            const matchFilter =
                filter === 'all' ||
                ticket.type?.toLowerCase() === filter.toLowerCase();

            return matchSearch && matchFilter;
        });

        // 2. Sort Tickets based on sortBy value
        if (sortBy === 'price-asc') {
            return [...result].sort((a, b) => Number(a.price) - Number(b.price));
        }
        if (sortBy === 'price-desc') {
            return [...result].sort((a, b) => Number(b.price) - Number(a.price));
        }

        return result;
    }, [searchQuery, filter, sortBy, tickets]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filter, sortBy]);

    const totalPages = Math.ceil(filteredAndSortedTickets.length / ITEMS_PER_PAGE);

    const paginatedTickets = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredAndSortedTickets.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredAndSortedTickets, currentPage]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
    };

    const handleClear = () => {
        setSearchInput('');
        setSearchQuery('');
        setFilter('all');
        setSortBy('default'); // Reset sort configuration
    };

    if (loading) {
        return <Loading />;
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

            {/* SEARCH + FILTER + SORT */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">

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

                    <button className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm whitespace-nowrap">
                        Search
                    </button>

                    <button
                        type="button"
                        onClick={handleClear}
                        className="ml-2 bg-gray-200 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap"
                    >
                        Clear
                    </button>
                </form>

                {/* FILTER BOX AND SORT BAR WRAPPER */}
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    {/* Transport Filter */}
                    <div className="bg-white border rounded-xl px-3 py-2 shadow-sm w-full sm:w-60">
                        <FilterBox value={filter} onChange={setFilter} />
                    </div>

                    {/* Price Sort Dropdown */}
                    <div className="bg-white border rounded-xl px-3 py-2 shadow-sm w-full sm:w-60 flex items-center gap-2">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full h-12 px-4 rounded-xl border border-default-200 bg-background outline-none"
                        >
                            <option value="default">Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>
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
                            alt={ticket.title}
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
                                {ticket.type || ticket.transport}
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
                                {ticket.time || ''}
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
            {totalPages > 1 && (
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
            )}
        </div>
    );
};

export default AllTickets;