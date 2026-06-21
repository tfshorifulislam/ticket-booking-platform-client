'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FaUserCircle,
    FaTicketAlt,
    FaHistory,
    FaBus,
    FaRegUserCircle,
} from 'react-icons/fa';
import { LuTickets } from 'react-icons/lu';
import { GoHistory } from 'react-icons/go';
import { useSession } from '@/lib/auth-client';

const Sidebar = () => {
    const pathname = usePathname();

    const { data: session, isPending } = useSession()
    const role = session?.user?.role
    console.log(role)

    const menuConfig = {
        user: [
            {
                name: 'User Profile',
                href: '/dashboard/userprofile',
                icon: <FaRegUserCircle />,
            },
            {
                name: 'My Booked Tickets',
                href: '/dashboard/booked-tickets',
                icon: <LuTickets />,
            },
            {
                name: 'Transaction History',
                href: '/dashboard/transactions',
                icon: <GoHistory />,
            },
        ],

        admin: [
            {
                name: 'Admin Profile',
                href: '/dashboard/admin/profile',
                icon: <FaRegUserCircle />,
            },
            {
                name: 'Manage Tickets',
                href: '/dashboard/admin/manage-tickets',
                icon: <LuTickets />,
            },
            {
                name: 'Manage Users',
                href: '/dashboard/admin/manage-users',
                icon: <FaUserCircle />,
            },
            {
                name: 'Advertise Tickets',
                href: '/dashboard/admin/advertise-tickets',
                icon: <FaBus />,
            },
        ],

        vendor: [
            {
                name: 'Vendor Profile',
                href: '/dashboard/vendor/profile',
                icon: <FaRegUserCircle />,
            },
            {
                name: 'Add Ticket',
                href: '/dashboard/vendor/add-ticket',
                icon: <LuTickets />,
            },
            {
                name: 'My Added Tickets',
                href: '/dashboard/vendor/my-tickets',
                icon: <FaTicketAlt />,
            },
            {
                name: 'Requested Bookings',
                href: '/dashboard/vendor/bookings',
                icon: <GoHistory />,
            },
            {
                name: 'Revenue Overview',
                href: '/dashboard/vendor/revenue',
                icon: <FaBus />,
            },
        ],
    };

    const menuItems = menuConfig[role] || [];

    return (
        <>
            <div className="top-0 left-0 min-h-screen bg-white rounded-b-lg shadow-sm border-r transition-all duration-300 flex flex-col w-16 sm:w-64">
                <div className="h-16 flex items-center px-4 border-b justify-center sm:justify-start sm:px-6">
                    <h1 className="text-xl font-bold text-green-600 truncate">
                        <span><FaBus className="text-2xl text-green-600 block sm:hidden" /></span>
                        <span className="hidden sm:block">Ticket System</span>
                    </h1>
                </div>
                <nav className="p-2 sm:p-4 space-y-2 flex-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}z
                                className={`flex items-center gap-4 p-3 rounded-xl justify-center sm:justify-start ${isActive
                                        ? 'bg-green-600 text-white'
                                        : 'text-gray-600 hover:bg-green-50 hover:text-green-600'}`}>
                                <span className="text-xl shrink-0">{item.icon}</span>
                                <span className="hidden sm:block text-sm font-medium">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;