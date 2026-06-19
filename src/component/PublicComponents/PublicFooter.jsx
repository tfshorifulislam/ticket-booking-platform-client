import Link from 'next/link';
import React from 'react';
import { FaBus, FaFacebookF, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { SiStripe } from 'react-icons/si';

const PublicFooter = () => {
    return (
        <footer className="bg-slate-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <FaBus className="text-2xl text-green-500" />
                            <h2 className="text-xl font-bold text-white">
                                TicketBari
                            </h2>
                        </div>
                        <p className="text-sm leading-6 text-gray-400">
                            Book bus, train, launch & flight tickets easily.
                            Fast, secure and hassle-free ticket booking
                            platform for all your travel needs.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-green-400 transition">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/tickets"
                                    className="hover:text-green-400 transition"
                                >
                                    All Tickets
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-green-400 transition"
                                >
                                    Contact Us
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-green-400 transition"
                                >
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Contact Info
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-green-500" />
                                <span>support@ticketbari.com</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-green-500" />
                                <span>+880 1234-567890</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaFacebookF className="text-green-500" />
                                <Link
                                    href="#"
                                    className="hover:text-green-400 transition"
                                >
                                    Facebook Page
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Payment Methods
                        </h3>

                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 inline-flex items-center gap-3">
                            <SiStripe className="text-3xl text-indigo-400" />
                            <span className="font-medium">Stripe</span>
                        </div>

                        <p className="text-sm text-gray-400 mt-4">
                            Secure online payments powered by Stripe.
                        </p>
                    </div>

                </div>
            </div>
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 py-5 text-center text-sm text-gray-400">
                    © 2025 TicketBari. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default PublicFooter;