import Link from 'next/link';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

const NabarDrawer = ({ menuItems, isLoggedIn, mobileMenu, setMobileMenu , user ,handleSignOut }) => {
    return (
        <div
            className={`fixed inset-0 z-50 md:hidden transition ${mobileMenu ? 'visible' : 'invisible'
                }`}
        >
            {/* Overlay */}
            <div
                onClick={() => setMobileMenu(false)}
                className={`absolute inset-0 bg-black/40 transition-opacity ${mobileMenu ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            {/* Drawer */}
            <div
                className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl transform transition-transform ${mobileMenu ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="font-bold text-lg">Menu</h2>
                    <button onClick={() => setMobileMenu(false)}>
                        <RxCross2 className="text-2xl" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-4">

                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenu(false)}
                            className="py-2 px-3 rounded-lg hover:bg-gray-100"
                        >
                            {item.name}
                        </Link>
                    ))}

                    <hr />

                    {!isLoggedIn ? (
                        <>
                            <Link
                                href="/auth/login"
                                onClick={() => setMobileMenu(false)}
                                className="py-2 px-3 rounded-lg border"
                            >
                                Login
                            </Link>

                            <Link
                                href="/auth/registration"
                                onClick={() => setMobileMenu(false)}
                                className="py-2 px-3 bg-green-600 text-white rounded-lg text-center"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-3">
                                <FaUserCircle className="text-3xl" />
                                <div>
                                    <p className="font-semibold">{user?.name}</p>
                                    <p className="text-sm text-gray-500">Account</p>
                                </div>
                            </div>

                            <button
                                onClick={handleSignOut}
                                className="mt-2 text-left text-red-600"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NabarDrawer;