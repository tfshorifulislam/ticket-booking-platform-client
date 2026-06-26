import Link from 'next/link';
import React from 'react';
import { FaBus, FaTrain, FaPlane, FaShip } from 'react-icons/fa';

const PublicBanner = () => {
    return (
        <section className="relative overflow-hidden bg-green-700 dark:bg-zinc-950 text-white">

            <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-32">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT */}
                    <div>

                        <span className="inline-flex items-center rounded-full border border-white/20 dark:border-zinc-700 px-4 py-2 text-sm backdrop-blur-xl bg-white/10 dark:bg-zinc-900">
                            ✈️ Trusted Ticket Booking Platform
                        </span>

                        <h1 className="mt-8 text-5xl lg:text-7xl font-black leading-tight">

                            Travel

                            <span className="block text-white dark:text-zinc-300">
                                Without Limits
                            </span>

                        </h1>

                        <p className="mt-7 text-lg text-green-50 dark:text-zinc-400 max-w-xl leading-8">

                            Book Bus, Train, Flight and Launch tickets in seconds.
                            Fast booking, secure payment and real-time availability
                            all from one modern platform.

                        </p>

                        <div className="flex flex-wrap gap-4 mt-10">

                            <Link
                                href="/tickets"
                                className="rounded-2xl bg-white text-green-700 px-8 py-4 font-semibold shadow-2xl transition hover:scale-105"
                            >
                                Book Tickets →
                            </Link>

                            <Link
                                href="/auth/registration"
                                className="rounded-2xl border border-white/20 dark:border-zinc-700 bg-white/10 dark:bg-zinc-900 px-8 py-4 font-semibold backdrop-blur-xl hover:bg-white hover:text-green-700 dark:hover:bg-zinc-800 dark:hover:text-white transition"
                            >
                                Create Account
                            </Link>

                        </div>

                        {/* Stats */}

                        <div className="grid grid-cols-3 gap-6 mt-14">

                            <div>
                                <h2 className="text-3xl font-bold">
                                    25K+
                                </h2>

                                <p className="text-sm text-green-100 dark:text-zinc-500">
                                    Happy Users
                                </p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold">
                                    120+
                                </h2>

                                <p className="text-sm text-green-100 dark:text-zinc-500">
                                    Transport Partners
                                </p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold">
                                    99%
                                </h2>

                                <p className="text-sm text-green-100 dark:text-zinc-500">
                                    Success Rate
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="grid sm:grid-cols-2 gap-5">

                        {[
                            {
                                icon: <FaBus />,
                                title: "Bus Booking",
                                text: "Fast & affordable routes"
                            },
                            {
                                icon: <FaTrain />,
                                title: "Train Booking",
                                text: "Instant seat reservation"
                            },
                            {
                                icon: <FaPlane />,
                                title: "Flight Booking",
                                text: "Domestic & International"
                            },
                            {
                                icon: <FaShip />,
                                title: "Launch Booking",
                                text: "Comfortable river travel"
                            },
                        ].map((item) => (

                            <div
                                key={item.title}
                                className="rounded-3xl border border-white/15 dark:border-zinc-800 bg-white/10 dark:bg-zinc-900/80 backdrop-blur-xl p-8 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
                            >

                                <div className="w-16 h-16 rounded-2xl bg-white/15 dark:bg-zinc-800 flex items-center justify-center text-3xl mb-6">

                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-green-100 dark:text-zinc-400">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PublicBanner;