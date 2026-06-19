'use client';

import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-white via-green-50/40 to-white">
            <div className="w-11/12 max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        Get In Touch
                    </span>

                    <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900">
                        Contact Us
                    </h2>

                    <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                        Have questions? We are here to help you 24/7. Reach out anytime.
                    </p>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-10">

                    {/* Left Info */}
                    <div className="space-y-6">

                        <div className="flex items-center gap-4 p-5 bg-white border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition">
                            <FaPhoneAlt className="text-green-600 text-xl" />
                            <div>
                                <h4 className="font-semibold text-gray-800">Phone</h4>
                                <p className="text-gray-600 text-sm">+880 1700-000000</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-5 bg-white border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition">
                            <FaEnvelope className="text-green-600 text-xl" />
                            <div>
                                <h4 className="font-semibold text-gray-800">Email</h4>
                                <p className="text-gray-600 text-sm">support@ticketbari.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-5 bg-white border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition">
                            <FaMapMarkerAlt className="text-green-600 text-xl" />
                            <div>
                                <h4 className="font-semibold text-gray-800">Address</h4>
                                <p className="text-gray-600 text-sm">
                                    Dhaka, Bangladesh
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right Form */}
                    <div className="bg-white border border-green-100 rounded-2xl shadow-sm p-6 md:p-8">

                        <form className="space-y-5">

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="Write your message..."
                                    className="w-full mt-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
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