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

        const data = await getRequestBooking(
          session?.user?.email
        );

        setBookings(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [session]);

  // Accepted bookings only
  const acceptedBookings = useMemo(() => {
    return bookings.filter(
      (item) => item.status === 'accepted'
    );
  }, [bookings]);

  // Total tickets sold
  const totalTicketsSold = acceptedBookings.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  // Total revenue
  const totalRevenue = acceptedBookings.reduce(
    (sum, item) => sum + Number(item.totalPrice || 0),
    0
  );

  // Booking status pie chart
  const ticketStatusData = [
    {
      name: 'Accepted',
      value: bookings.filter(
        (item) => item.status === 'accepted'
      ).length,
    },
    {
      name: 'Pending',
      value: bookings.filter(
        (item) => item.status === 'pending'
      ).length,
    },
    {
      name: 'Rejected',
      value: bookings.filter(
        (item) => item.status === 'rejected'
      ).length,
    },
  ];

  // Monthly revenue chart
  const revenueData = useMemo(() => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const monthlyRevenue = {};

    acceptedBookings.forEach((booking) => {
      const date = new Date(booking.bookedAt);
      const month = months[date.getMonth()];

      if (!monthlyRevenue[month]) {
        monthlyRevenue[month] = 0;
      }

      monthlyRevenue[month] += Number(
        booking.totalPrice || 0
      );
    });

    return months.map((month) => ({
      month,
      revenue: monthlyRevenue[month] || 0,
    }));
  }, [acceptedBookings]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Revenue Overview
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Tickets Sold
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {totalTicketsSold}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Revenue
          </p>

          <h2 className="text-3xl font-bold text-emerald-600 mt-2">
            ৳ {totalRevenue.toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Revenue Chart */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Monthly Revenue
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Status */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Booking Status
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={ticketStatusData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {ticketStatusData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[index % COLORS.length]
                      }
                    />
                  )
                )}
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