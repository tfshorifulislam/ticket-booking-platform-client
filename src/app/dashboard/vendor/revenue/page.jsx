'use client';

import { getRequestBooking } from '@/lib/api/ticket';
import { useSession } from '@/lib/auth-client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const COLORS = ['#16a34a', '#f59e0b', '#ef4444'];

const RevenuePage = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        if (!session?.user?.email) return;
        const data = await getRequestBooking(session?.user?.email);
        setBookings(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [session]);

  // Calculations
  const totalTicketsAdded = bookings.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const acceptedBookings = bookings.filter((item) => item.status === 'accepted');

  const totalTicketsSold = acceptedBookings.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const totalRevenue = acceptedBookings.reduce(
    (sum, item) => sum + Number(item.totalPrice || 0),
    0
  );

  // Booking Status Data
  const ticketStatusData = [
    {
      name: 'Accepted',
      value: bookings.filter((b) => b.status === 'accepted').length,
    },
    {
      name: 'Pending',
      value: bookings.filter((b) => b.status === 'pending').length,
    },
    {
      name: 'Rejected',
      value: bookings.filter((b) => b.status === 'rejected').length,
    },
  ];

  // Monthly Revenue
  const revenueData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyRevenue = {};

    acceptedBookings.forEach((booking) => {
      const date = new Date(booking.bookedAt);
      const month = months[date.getMonth()];
      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + Number(booking.totalPrice || 0);
    });

    return months.map((month) => ({
      month,
      revenue: monthlyRevenue[month] || 0,
    }));
  }, [acceptedBookings]);

  // Tickets Added vs Sold
  const ticketsComparison = [
    {
      name: 'Tickets',
      added: totalTicketsAdded,
      sold: totalTicketsSold,
    },
  ];

  if (loading) {
    return <div className="p-10 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Revenue Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Tickets Added</p>
          <h2 className="text-4xl font-bold text-gray-800 mt-3">{totalTicketsAdded}</h2>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Tickets Sold</p>
          <h2 className="text-4xl font-bold text-green-600 mt-3">{totalTicketsSold}</h2>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-4xl font-bold text-emerald-600 mt-3">
            ৳ {totalRevenue.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tickets Added vs Sold */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Tickets Added vs Sold</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={ticketsComparison}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="added" fill="#64748b" name="Tickets Added" radius={8} />
              <Bar dataKey="sold" fill="#16a34a" name="Tickets Sold" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`৳ ${value.toLocaleString()}`, 'Revenue']} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#16a34a"
                strokeWidth={4}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Status Pie Chart */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Booking Status Distribution</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={ticketStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {ticketStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;