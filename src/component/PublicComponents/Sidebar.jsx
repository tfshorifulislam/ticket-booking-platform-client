'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaUserCircle,
  FaTicketAlt,
  FaHistory,
} from 'react-icons/fa';

const Sidebar = () => {
  const pathname = usePathname();

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
      {/* Fixed Full Height Sidebar */}
      <div 
        className="fixed top-0 left-0 h-screen bg-white shadow-md border-r z-50 transition-all duration-300 flex flex-col
                   w-16 sm:w-64"
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-4 border-b justify-center sm:justify-start sm:px-6">
          <h1 className="text-xl font-bold text-green-600 truncate">
            {/* ছোট স্ক্রিনে শুধু ইমোজি বা লোগো আইকন, বড় স্ক্রিনে পুরো টেক্সট */}
            <span className="block sm:hidden text-2xl">🎫</span>
            <span className="hidden sm:block">Ticket System</span>
          </h1>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2 sm:p-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={i}
                href={item.href}
                className={`
                  flex items-center gap-4 p-3 rounded-xl transition-all duration-200
                  justify-center sm:justify-start
                  ${isActive 
                    ? 'bg-green-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                  }
                `}
                title={item.name}
              >
                {/* আইকন সবসময় দৃশ্যমান */}
                <span className="text-xl flex-shrink-0">{item.icon}</span>

                {/* নাম শুধুমাত্র sm স্ক্রিন এবং তার উপরে দেখাবে */}
                <span className="hidden sm:block text-sm font-medium whitespace-nowrap">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Spacer Element: সাইডবারটি ফিক্সড হওয়ায় মেইন কনটেন্ট যেন এটার নিচে ঢাকা না পড়ে */}
      <div className="w-16 sm:w-64 flex-shrink-0" />
    </>
  );
};

export default Sidebar;