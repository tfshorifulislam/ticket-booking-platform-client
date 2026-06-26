import Link from 'next/link';
import React from 'react';
import { FaBus, FaTrain, FaPlane, FaShip } from 'react-icons/fa';

const PublicBanner = () => {
    return (
        <section className="bg-gradient-to-r from-green-600 to-emerald-500 dark:from-emerald-900 dark:to-zinc-950 text-white transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-20 lg:py-28">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Book Your Tickets
                            <span className="block mt-2">
                                Anytime, Anywhere
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-green-50 dark:text-zinc-300 max-w-xl">
                            Easily book bus, train, launch, and flight tickets
                            from one platform. Fast, secure, and hassle-free
                            ticket booking experience.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link
                                href="/tickets"
                                className="bg-white text-green-600 dark:bg-zinc-100 dark:text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-white transition"
                            >
                                Book Now
                            </Link>

                            <Link
                                href="/auth/registration"
                                className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-600 dark:hover:text-black transition"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="grid grid-cols-2 gap-5">

                        <div className="bg-white/10 dark:bg-white/5 border border-white/20 dark:border-zinc-700 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 dark:hover:bg-zinc-800 transition">
                            <FaBus className="mx-auto text-5xl mb-3" />
                            <h3 className="font-semibold text-lg">Bus Tickets</h3>
                        </div>

                        <div className="bg-white/10 dark:bg-white/5 border border-white/20 dark:border-zinc-700 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 dark:hover:bg-zinc-800 transition">
                            <FaTrain className="mx-auto text-5xl mb-3" />
                            <h3 className="font-semibold text-lg">Train Tickets</h3>
                        </div>

                        <div className="bg-white/10 dark:bg-white/5 border border-white/20 dark:border-zinc-700 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 dark:hover:bg-zinc-800 transition">
                            <FaPlane className="mx-auto text-5xl mb-3" />
                            <h3 className="font-semibold text-lg">Flight Tickets</h3>
                        </div>

                        <div className="bg-white/10 dark:bg-white/5 border border-white/20 dark:border-zinc-700 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 dark:hover:bg-zinc-800 transition">
                            <FaShip className="mx-auto text-5xl mb-3" />
                            <h3 className="font-semibold text-lg">Launch Tickets</h3>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default PublicBanner;