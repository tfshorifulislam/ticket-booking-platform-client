'use client';

import React, { useState } from 'react';
import {
    FaBus,
    FaUserCircle,
    FaChevronDown,
} from 'react-icons/fa';
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';

const PublicNavbar = () => {
    // demo state
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const menuItems = [
        { name: 'Home', href: '/' },
        { name: 'All Tickets', href: '/tickets' },
        ...(isLoggedIn
            ? [{ name: 'Dashboard', href: '/dashboard' }]
            : []),
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <FaBus className="text-2xl text-green-600" />
                        <h1 className="text-xl font-bold text-gray-800">
                            TicketBari
                        </h1>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {menuItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="font-medium text-gray-700 hover:text-green-600 transition"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center">
                        {!isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                <button className="px-4 py-2 font-medium text-gray-700 hover:text-green-600">
                                    Login
                                </button>

                                <button className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                                    Register
                                </button>
                            </div>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdown(!dropdown)}
                                    className="flex items-center gap-3"
                                >
                                    <img
                                        src="https://i.pravatar.cc/150?img=12"
                                        alt="avatar"
                                        className="w-10 h-10 rounded-full border object-cover"
                                    />

                                    <span className="font-medium text-gray-700">
                                        Shoriful
                                    </span>

                                    <FaChevronDown
                                        className={`text-sm transition ${dropdown ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {dropdown && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border overflow-hidden">
                                        <a
                                            href="/profile"
                                            className="block px-4 py-3 hover:bg-gray-100"
                                        >
                                            My Profile
                                        </a>

                                        <button
                                            className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="md:hidden text-2xl text-gray-700"
                    >
                        {mobileMenu ? <RxCross2 />: <RxHamburgerMenu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenu && (
                    <div className="md:hidden border-t py-4">
                        <div className="flex flex-col gap-4">
                            {menuItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="font-medium text-gray-700 hover:text-green-600"
                                >
                                    {item.name}
                                </a>
                            ))}

                            {!isLoggedIn ? (
                                <>
                                    <button className="text-left font-medium">
                                        Login
                                    </button>

                                    <button className="bg-green-600 text-white py-2 rounded-lg">
                                        Register
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3 pt-2">
                                        <FaUserCircle className="text-4xl text-gray-500" />
                                        <div>
                                            <h3 className="font-semibold">
                                                Shoriful
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                User Account
                                            </p>
                                        </div>
                                    </div>

                                    <a
                                        href="/profile"
                                        className="font-medium"
                                    >
                                        My Profile
                                    </a>

                                    <button className="text-left text-red-600 font-medium">
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default PublicNavbar;