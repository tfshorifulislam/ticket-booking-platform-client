'use client'
import React from 'react';
import {
  Users,
  Ticket,
  ShieldCheck,
  MapPin,
  Clock,
  Star,
} from 'lucide-react';

const Dashboard = () => {

  return (
  <div className="space-y-8 p-6">

    {/* Welcome Section */}
    <div className="bg-green-600 dark:bg-gradient-to-r dark:from-green-700 dark:to-emerald-900 text-white rounded-2xl p-8 shadow-lg">
      <h1 className="text-3xl font-bold mb-3">
        Welcome to Ticket Booking Platform
      </h1>

      <p className="text-green-100 dark:text-gray-200 max-w-3xl">
        Book buses, trains, flights, and transport tickets easily from
        trusted vendors across the country. Our platform connects travelers,
        vendors, and administrators in one secure ecosystem.
      </p>
    </div>

    {/* Platform Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
        <Ticket className="w-10 h-10 text-blue-600 mb-3" />
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          10K+
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Tickets Booked
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
        <Users className="w-10 h-10 text-green-600 mb-3" />
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          5K+
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Happy Travelers
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
        <MapPin className="w-10 h-10 text-orange-600 mb-3" />
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          100+
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Destinations
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
        <ShieldCheck className="w-10 h-10 text-purple-600 mb-3" />
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          99%
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Secure Transactions
        </p>
      </div>

    </div>

    {/* About */}
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        About Our Platform
      </h2>

      <p className="text-gray-600 dark:text-gray-300 leading-7">
        Our ticket booking system provides a seamless experience for users to
        discover, compare, and book transport tickets. Vendors can easily
        manage schedules, routes, prices, and seat availability, while admins
        ensure platform quality and security.
      </p>
    </div>

    {/* Features */}
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Key Features
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-5 hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
          <Ticket className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
            Easy Ticket Booking
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Search routes and reserve tickets within seconds.
          </p>
        </div>

        <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-5 hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
          <Clock className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
            Real-Time Availability
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Get updated seat information instantly.
          </p>
        </div>

        <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-5 hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
          <ShieldCheck className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
            Secure Payments
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Multiple secure payment options for safe transactions.
          </p>
        </div>

        <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-5 hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
          <Users className="w-8 h-8 text-orange-600 mb-3" />
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
            Vendor Management
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Vendors can manage routes, schedules, and bookings.
          </p>
        </div>

        <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-5 hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
          <MapPin className="w-8 h-8 text-red-600 mb-3" />
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
            Wide Coverage
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Travel across multiple cities and destinations.
          </p>
        </div>

        <div className="border border-gray-200 dark:border-zinc-700 rounded-xl p-5 hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
          <Star className="w-8 h-8 text-yellow-500 mb-3" />
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
            Trusted Service
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Reliable booking experience for every traveler.
          </p>
        </div>

      </div>
    </div>

    {/* Why Choose Us */}
    <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl p-6">
      <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
        Why Choose Us?
      </h3>

      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
        <li>✔ Instant booking confirmation</li>
        <li>✔ Secure payment gateway integration</li>
        <li>✔ Trusted vendors and transport providers</li>
        <li>✔ Easy booking management</li>
        <li>✔ Responsive support system</li>
      </ul>
    </div>

  </div>
);
};

export default Dashboard;