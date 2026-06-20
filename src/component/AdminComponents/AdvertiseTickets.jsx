'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBus, FaTag, FaArrowRight } from 'react-icons/fa';

const AdvertiseTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvertisedTickets = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/advertised-tickets');
        const data = await res.json();
        setTickets(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisedTickets();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  if (tickets.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50">
      <div className="w-11/12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-medium">
            Handpicked by Admin
          </span>
          <h2 className="text-4xl font-bold mt-4 text-slate-800">
            Featured Tickets
          </h2>
          <p className="text-slate-500 mt-3 max-w-md mx-auto">
            Premium bus tickets specially advertised for you
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets.slice(0, 6).map((ticket) => (
            <div
              key={ticket._id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-green-200 flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={ticket.image || '/placeholder-bus.jpg'}
                  alt={ticket.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                  FEATURED
                </div>

                {ticket.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {ticket.discount}% OFF
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 line-clamp-2 mb-3 group-hover:text-green-700 transition-colors">
                  {ticket.title}
                </h3>

                {/* Route */}
                {(ticket.from && ticket.to) && (
                  <div className="flex items-center gap-2 text-slate-600 mb-4">
                    <FaBus className="text-green-600" />
                    <span className="font-medium">
                      {ticket.from} <span className="text-green-500 mx-1">→</span> {ticket.to}
                    </span>
                  </div>
                )}

                <div className="space-y-2.5 text-sm flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Price</span>
                    <span className="text-2xl font-bold text-green-600">
                      ৳{ticket.price}
                    </span>
                  </div>

                  {ticket.quantity && (
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Seats Available</span>
                      <span className="font-medium">{ticket.quantity}</span>
                    </div>
                  )}

                  {ticket.type && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <FaBus className="text-green-600" />
                      <span>{ticket.type}</span>
                    </div>
                  )}
                </div>

                {/* Perks */}
                {ticket.perks && ticket.perks.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {ticket.perks.slice(0, 3).map((perk, index) => (
                      <span
                        key={index}
                        className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full flex items-center gap-1"
                      >
                        <FaTag className="text-xs" />
                        {perk}
                      </span>
                    ))}
                  </div>
                )}

                {/* Button */}
                <Link
                  href={`/tickets/${ticket._id}`}
                  className="mt-6 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-2xl font-semibold transition-all duration-200 group-hover:scale-[1.02]"
                >
                  View Details
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvertiseTickets;