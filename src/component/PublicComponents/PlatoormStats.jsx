import React from 'react';
import { FaUsers, FaBus, FaMapMarkedAlt, FaStar } from 'react-icons/fa';

const PlatformStats = () => {
    return (
        <section className="py-16 bg-green-600 dark:bg-gradient-to-r dark:from-emerald-900 dark:to-zinc-950 text-white transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Trusted by Thousands of Travelers
                    </h2>

                    <p className="mt-3 text-green-100 dark:text-zinc-300 max-w-2xl mx-auto">
                        We make ticket booking simple, secure, and accessible for everyone.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-zinc-700 rounded-2xl p-6 text-center hover:bg-white/20 dark:hover:bg-zinc-800 transition-all duration-300">
                        <FaUsers className="text-4xl mx-auto mb-4 text-white dark:text-green-400" />
                        <h3 className="text-3xl font-bold">50K+</h3>
                        <p className="mt-2 text-green-100 dark:text-zinc-300">
                            Happy Customers
                        </p>
                    </div>

                    <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-zinc-700 rounded-2xl p-6 text-center hover:bg-white/20 dark:hover:bg-zinc-800 transition-all duration-300">
                        <FaBus className="text-4xl mx-auto mb-4 text-white dark:text-green-400" />
                        <h3 className="text-3xl font-bold">200+</h3>
                        <p className="mt-2 text-green-100 dark:text-zinc-300">
                            Transport Partners
                        </p>
                    </div>

                    <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-zinc-700 rounded-2xl p-6 text-center hover:bg-white/20 dark:hover:bg-zinc-800 transition-all duration-300">
                        <FaMapMarkedAlt className="text-4xl mx-auto mb-4 text-white dark:text-green-400" />
                        <h3 className="text-3xl font-bold">100+</h3>
                        <p className="mt-2 text-green-100 dark:text-zinc-300">
                            Routes Covered
                        </p>
                    </div>

                    <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-zinc-700 rounded-2xl p-6 text-center hover:bg-white/20 dark:hover:bg-zinc-800 transition-all duration-300">
                        <FaStar className="text-4xl mx-auto mb-4 text-white dark:text-yellow-400" />
                        <h3 className="text-3xl font-bold">4.9/5</h3>
                        <p className="mt-2 text-green-100 dark:text-zinc-300">
                            Customer Rating
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PlatformStats;