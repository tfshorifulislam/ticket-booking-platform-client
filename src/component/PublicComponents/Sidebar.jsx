'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaUserCircle,
  FaTicketAlt,
  FaHistory,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      name: 'User Profile',
      href: '/dashboard/profile',
      icon: <FaUserCircle />,
    },
    {
      name: 'My Booked Tickets',
      href: '/dashboard/booked-tickets',
      icon: <FaTicketAlt />,
    },
    {
      name: 'Transaction History',
      href: '/dashboard/transactions',
      icon: <FaHistory />,
    },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
        <h2 className="font-bold text-lg text-gray-800">Dashboard</h2>

        <button
          onClick={() => setOpen(!open)}
          className="text-2xl text-gray-700"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* Header */}
        <div className="p-5 border-b">
          <h1 className="text-xl font-bold text-green-600">
            Ticket System
          </h1>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
              onClick={() => setOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;