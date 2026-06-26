import Link from 'next/link';
import React from 'react';
import { FaBus, FaTrain, FaPlane, FaShip } from 'react-icons/fa';

const PublicBanner = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 dark:from-slate-900 dark:via-zinc-900 dark:to-slate-900 text-white transition-all duration-500">

            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-white/10 blur-3xl dark:bg-green-500/10"></div>

                <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] rounded-full bg-white/10 blur-3xl dark:bg-emerald-500/10"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left */}
                    <div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                            Book Your Tickets
                            <span className="block mt-2 text-green-100 dark:text-green-400">
                                Anytime, Anywhere
                            </span>
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-green-50 dark:text-zinc-300 max-w-xl">
                            Easily book bus, train, launch and flight tickets
                            from one platform. Fast, secure and hassle-free
                            ticket booking experience.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-10">

                            <Link
                                href="/tickets"
                                className="px-7 py-3 rounded-xl bg-white text-green-700 font-semibold shadow-xl hover:bg-green-50 hover:scale-105 transition-all duration-300"
                            >
                                Book Now
                            </Link>

                            <Link
                                href="/auth/registration"
                                className="px-7 py-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md font-semibold hover:bg-white hover:text-green-700 transition-all duration-300"
                            >
                                Get Started
                            </Link>

                        </div>
                    </div>

                    {/* Right */}
                    <div className="grid grid-cols-2 gap-5">

                        <div className="rounded-2xl border border-white/20 dark:border-zinc-700 bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 text-center hover:-translate-y-2 hover:bg-white/20 dark:hover:bg-zinc-800/70 transition-all duration-300">
                            <FaBus className="mx-auto text-5xl mb-4 text-green-100 dark:text-green-400" />
                            <h3 className="font-semibold text-lg">
                                Bus Tickets
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-white/20 dark:border-zinc-700 bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 text-center hover:-translate-y-2 hover:bg-white/20 dark:hover:bg-zinc-800/70 transition-all duration-300">
                            <FaTrain className="mx-auto text-5xl mb-4 text-green-100 dark:text-green-400" />
                            <h3 className="font-semibold text-lg">
                                Train Tickets
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-white/20 dark:border-zinc-700 bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 text-center hover:-translate-y-2 hover:bg-white/20 dark:hover:bg-zinc-800/70 transition-all duration-300">
                            <FaPlane className="mx-auto text-5xl mb-4 text-green-100 dark:text-green-400" />
                            <h3 className="font-semibold text-lg">
                                Flight Tickets
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-white/20 dark:border-zinc-700 bg-white/10 dark:bg-white/5 backdrop-blur-xl p-6 text-center hover:-translate-y-2 hover:bg-white/20 dark:hover:bg-zinc-800/70 transition-all duration-300">
                            <FaShip className="mx-auto text-5xl mb-4 text-green-100 dark:text-green-400" />
                            <h3 className="font-semibold text-lg">
                                Launch Tickets
                            </h3>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default PublicBanner;