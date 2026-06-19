'use client';

import React from 'react';
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

const revenueData = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 18000 },
  { month: 'Mar', revenue: 14000 },
  { month: 'Apr', revenue: 22000 },
  { month: 'May', revenue: 30000 },
];

const ticketStatusData = [
  { name: 'Sold', value: 120 },
  { name: 'Remaining', value: 80 },
];

const COLORS = ['#16a34a', '#e5e7eb'];

const RevenuePage = () => {
  const totalTicketsAdded = 200;
  const totalTicketsSold = 120;
  const totalRevenue = 86000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Revenue Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">

        <div className="p-5 rounded-2xl border bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total Tickets Added</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {totalTicketsAdded}
          </p>
        </div>

        <div className="p-5 rounded-2xl border bg-white shadow-sm">
          <p className="text-sm text-gray-500">Tickets Sold</p>
          <p className="text-2xl font-semibold text-green-600 mt-1">
            {totalTicketsSold}
          </p>
        </div>

        <div className="p-5 rounded-2xl border bg-white shadow-sm">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-semibold text-emerald-600 mt-1">
            ৳ {totalRevenue}
          </p>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Revenue Line Chart */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Monthly Revenue
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#16a34a"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Ticket Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ticketStatusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {ticketStatusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
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