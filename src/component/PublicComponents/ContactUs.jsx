'use client';

import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-white via-green-50/40 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 transition-colors duration-300">
            <div className="w-11/12 max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm font-medium">
                        Get In Touch
                    </span>

                    <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                        Contact Us
                    </h2>

                    <p className="mt-3 text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Have questions? We are here to help you 24/7. Reach out anytime.
                    </p>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-10">

                    {/* Left Info */}
                    <div className="space-y-6">

                        <div className="flex items-center gap-4 p-5 bg-white dark:bg-zinc-900 border border-green-100 dark:border-zinc-700 rounded-2xl shadow-sm hover:shadow-md dark:hover:shadow-zinc-900/40 hover:border-green-300 dark:hover:border-green-500 transition-all duration-300">
                            <FaPhoneAlt className="text-green-600 dark:text-green-400 text-xl" />
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white">
                                    Phone
                                </h4>
                                <p className="text-gray-600 dark:text-zinc-400 text-sm">
                                    +880 1700-000000
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-5 bg-white dark:bg-zinc-900 border border-green-100 dark:border-zinc-700 rounded-2xl shadow-sm hover:shadow-md dark:hover:shadow-zinc-900/40 hover:border-green-300 dark:hover:border-green-500 transition-all duration-300">
                            <FaEnvelope className="text-green-600 dark:text-green-400 text-xl" />
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white">
                                    Email
                                </h4>
                                <p className="text-gray-600 dark:text-zinc-400 text-sm">
                                    support@ticketbari.com
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-5 bg-white dark:bg-zinc-900 border border-green-100 dark:border-zinc-700 rounded-2xl shadow-sm hover:shadow-md dark:hover:shadow-zinc-900/40 hover:border-green-300 dark:hover:border-green-500 transition-all duration-300">
                            <FaMapMarkerAlt className="text-green-600 dark:text-green-400 text-xl" />
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white">
                                    Address
                                </h4>
                                <p className="text-gray-600 dark:text-zinc-400 text-sm">
                                    Dhaka, Bangladesh
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right Form */}
                    <div className="bg-white dark:bg-zinc-900 border border-green-100 dark:border-zinc-700 rounded-2xl shadow-sm p-6 md:p-8">

                        <form className="space-y-5">

                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                                    Your Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full mt-2 px-4 py-3 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full mt-2 px-4 py-3 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                                    Message
                                </label>

                                <textarea
                                    rows="4"
                                    placeholder="Write your message..."
                                    className="w-full mt-2 px-4 py-3 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition"
                            >
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default ContactUs;