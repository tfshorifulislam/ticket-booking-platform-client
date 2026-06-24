'use client';
import { signOut, useSession } from '@/lib/auth-client';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaBus, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import NabarDrawer from './NabarDrawer';

const PublicNavbar = () => {
    const [dropdown, setDropdown] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    const { data: session } = useSession();

    const user = session?.user;
    const isLoggedIn = !!user;


    const menuItems = [
        { name: 'Home', href: '/' },
        { name: 'All Tickets', href: '/tickets' },
        ...(isLoggedIn ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
    ];

    const handleSignOut = async () => {
        await signOut();
        setMobileMenu(false);
    };

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <FaBus className="text-2xl text-green-600" />
                            <h1 className="text-xl font-bold">TicketVally</h1>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex gap-8">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-700 hover:text-green-600 font-medium transition"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Right */}
                        <div className="hidden md:flex items-center gap-4">

                            {!isLoggedIn ? (
                                <>
                                    <Link href="/auth/login" className="text-gray-700 hover:text-green-600">
                                        Login
                                    </Link>
                                    <Link href="/auth/registration" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdown(!dropdown)}
                                        className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100"
                                    >
                                        <FaUserCircle className="text-xl" />
                                        <span>{user?.name}</span>
                                        <FaChevronDown className={`transition ${dropdown ? 'rotate-180' : ''}`} />
                                    </button>

                                    {dropdown && (
                                        <>
                                            <div
                                                onClick={() => setDropdown(false)}
                                                className="fixed inset-0"
                                            />

                                            <div className="absolute right-0 mt-3 w-48 bg-white border rounded-xl shadow-lg overflow-hidden">
                                                <button
                                                    onClick={handleSignOut}
                                                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Mobile Button */}
                        <button
                            onClick={() => setMobileMenu(true)}
                            className="md:hidden text-2xl"
                        >
                            <RxHamburgerMenu />
                        </button>
                    </div>
                </div>
            </nav>

            {/* ================= MOBILE DRAWER ================= */}
            <NabarDrawer
                menuItems={menuItems}
                isLoggedIn={isLoggedIn}
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
                user={user}
                handleSignOut={handleSignOut}
            />
        </>
    );
};

export default PublicNavbar;