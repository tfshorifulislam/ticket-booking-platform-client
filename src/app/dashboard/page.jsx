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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-3">
          Welcome to Ticket Booking Platform
        </h1>
        <p className="text-blue-100 max-w-3xl">
          Book buses, trains, flights, and transport tickets easily from
          trusted vendors across the country. Our platform connects travelers,
          vendors, and administrators in one secure ecosystem.
        </p>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-2xl p-6 border">
          <Ticket className="w-10 h-10 text-blue-600 mb-3" />
          <h3 className="text-3xl font-bold">10K+</h3>
          <p className="text-gray-500">Tickets Booked</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 border">
          <Users className="w-10 h-10 text-green-600 mb-3" />
          <h3 className="text-3xl font-bold">5K+</h3>
          <p className="text-gray-500">Happy Travelers</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 border">
          <MapPin className="w-10 h-10 text-orange-600 mb-3" />
          <h3 className="text-3xl font-bold">100+</h3>
          <p className="text-gray-500">Destinations</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 border">
          <ShieldCheck className="w-10 h-10 text-purple-600 mb-3" />
          <h3 className="text-3xl font-bold">99%</h3>
          <p className="text-gray-500">Secure Transactions</p>
        </div>
      </div>

      {/* About Platform */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4">About Our Platform</h2>

        <p className="text-gray-600 leading-7">
          Our ticket booking system provides a seamless experience for users to
          discover, compare, and book transport tickets. Vendors can easily
          manage schedules, routes, prices, and seat availability, while admins
          ensure platform quality and security.
        </p>
      </div>

      {/* Features */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6">Key Features</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-xl p-5">
            <Ticket className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold mb-2">Easy Ticket Booking</h3>
            <p className="text-gray-500 text-sm">
              Search routes and reserve tickets within seconds.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <Clock className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold mb-2">Real-Time Availability</h3>
            <p className="text-gray-500 text-sm">
              Get updated seat information instantly.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <ShieldCheck className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-500 text-sm">
              Multiple secure payment options for safe transactions.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <Users className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-semibold mb-2">Vendor Management</h3>
            <p className="text-gray-500 text-sm">
              Vendors can manage routes, schedules, and bookings.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <MapPin className="w-8 h-8 text-red-600 mb-3" />
            <h3 className="font-semibold mb-2">Wide Coverage</h3>
            <p className="text-gray-500 text-sm">
              Travel across multiple cities and destinations.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <Star className="w-8 h-8 text-yellow-500 mb-3" />
            <h3 className="font-semibold mb-2">Trusted Service</h3>
            <p className="text-gray-500 text-sm">
              Reliable booking experience for every traveler.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-gray-50 border rounded-2xl p-6">
        <h3 className="font-bold text-lg mb-2">Why Choose Us?</h3>

        <ul className="space-y-2 text-gray-600">
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