'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBus, FaTag } from 'react-icons/fa';

const AdvertiseTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvertisedTickets = async () => {
      try {
        const res = await fetch(
          'http://localhost:5000/api/advertised-tickets'
        );

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

  if (tickets.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-slate-50">

      <div className="w-11/12 max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center mb-12">

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            Featured Tickets
          </span>

          <h2 className="text-4xl font-bold mt-4 text-slate-800">
            Advertised Tickets
          </h2>

          <p className="text-slate-500 mt-2">
            Handpicked tickets promoted by admin
          </p>

        </div>

        {/* Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {tickets.slice(0, 6).map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-slate-100"
            >
              {/* Image */}

              <div className="relative h-56 overflow-hidden">

                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />

                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Featured
                </div>

              </div>

              {/* Content */}

              <div className="p-5">

                <h3 className="text-xl font-bold text-slate-800 mb-4 line-clamp-1">
                  {ticket.title}
                </h3>

                <div className="space-y-2 text-sm text-slate-600">

                  <p>
                    <span className="font-semibold">
                      Price:
                    </span>{' '}
                    ৳ {ticket.price}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Quantity:
                    </span>{' '}
                    {ticket.quantity}
                  </p>

                  <div className="flex items-center gap-2">
                    <FaBus className="text-green-600" />
                    <span>{ticket.type}</span>
                  </div>

                </div>

                {/* Perks */}

                <div className="flex flex-wrap gap-2 mt-4">

                  {ticket.perks?.slice(0, 3).map((perk, index) => (
                    <span
                      key={index}
                      className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs flex items-center gap-1"
                    >
                      <FaTag />
                      {perk}
                    </span>
                  ))}

                </div>

                {/* Button */}

                <Link
                  href={`/tickets/${ticket._id}`}
                  className="mt-6 block w-full text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition"
                >
                  See Details
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