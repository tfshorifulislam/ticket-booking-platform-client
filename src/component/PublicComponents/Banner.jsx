import Link from 'next/link';
import React from 'react';
import { FaBus, FaTrain, FaPlane, FaShip } from 'react-icons/fa';

const PublicBanner = () => {
    return (
        <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-white">
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

                        <p className="mt-6 text-lg text-green-50 max-w-xl">
                            Easily book bus, train, launch, and flight tickets
                            from one platform. Fast, secure, and hassle-free
                            ticket booking experience.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link
                                href="/tickets"
                                className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                            >
                                Book Now
                            </Link>

                            <Link
                                href="/auth/registration"
                                className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="grid grid-cols-2 gap-5">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
                            <FaBus className="mx-auto text-5xl mb-3" />
                            <h3 className="font-semibold text-lg">Bus Tickets</h3>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
                            <FaTrain className="mx-auto text-5xl mb-3" />
                            <h3 className="font-semibold text-lg">Train Tickets</h3>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
                            <FaPlane className="mx-auto text-5xl mb-3" />
                            <h3 className="font-semibold text-lg">Flight Tickets</h3>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
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