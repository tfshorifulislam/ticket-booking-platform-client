'use client';

import React from 'react';
import Marquee from 'react-fast-marquee';

const TrustedCompanies = () => {
    const companies = [
        { name: 'Green Line Paribahan' },
        { name: 'Shohagh Paribahan' },
        { name: 'Hanif Enterprise' },
        { name: 'Saintmartin Paribahan' },
        { name: 'Ena Transport' },
        { name: 'Shyamoli NR Travels' },
        { name: 'Sakura Paribahan' },
        { name: 'Desh Travels' },
        { name: 'Royal Coach' },
        { name: 'London Express' },
        { name: 'Unique Paribahan' },
        { name: 'Saintmartin Hyundai' },
        { name: 'BRTC' },
        { name: 'Eagle Paribahan' },
        { name: 'Keya Paribahan' },
        { name: 'Us-Bangla Airlines' },
        { name: 'Biman Bangladesh Airlines' },
        { name: 'NovoAir' },
        { name: 'Regent Airways' },
        { name: 'Intercity Coach' }
    ];

    return (
        <section className="py-12 bg-gradient-to-b from-white via-green-50/40 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 overflow-hidden transition-colors duration-300">
            <div className="w-11/12 mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm font-medium">
                        Trusted By Top Brands
                    </span>

                    <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                        Our Transport Partners
                    </h2>

                    <p className="mt-3 text-gray-600 dark:text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
                        Partnering with Bangladesh's most reliable transport companies for safe and smooth journeys.
                    </p>
                </div>

                {/* Marquee */}
                <div className="relative -mx-4">
                    <Marquee
                        speed={45}
                        pauseOnHover
                        gradient
                        gradientColor="transparent"
                    >
                        {companies.map((company, index) => (
                            <div key={index} className="mx-3">
                                <div
                                    className="
                                        px-6 py-3 mb-2
                                        rounded-xl
                                        bg-white
                                        dark:bg-zinc-900
                                        border
                                        border-green-100
                                        dark:border-zinc-700
                                        shadow-sm
                                        hover:shadow-md
                                        hover:border-green-300
                                        dark:hover:border-green-500
                                        hover:bg-green-50/60
                                        dark:hover:bg-zinc-800
                                        transition-all
                                        duration-300
                                        cursor-pointer
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>

                                    <h3 className="text-sm font-semibold text-gray-700 dark:text-zinc-200">
                                        {company.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </Marquee>
                </div>

            </div>
        </section>
    );
};

export default TrustedCompanies;