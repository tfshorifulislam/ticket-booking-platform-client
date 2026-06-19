import React from 'react';
import { FaUsers, FaBus, FaMapMarkedAlt, FaStar } from 'react-icons/fa';

const PlatformStats = () => {
    return (
        <section className="py-16 bg-green-600 text-white">
            <div className="max-w-7xl mx-auto px-4">

                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Trusted by Thousands of Travelers
                    </h2>
                    <p className="mt-3 text-green-100 max-w-2xl mx-auto">
                        We make ticket booking simple, secure, and accessible for everyone.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                        <FaUsers className="text-4xl mx-auto mb-4" />
                        <h3 className="text-3xl font-bold">50K+</h3>
                        <p className="mt-2 text-green-100">Happy Customers</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                        <FaBus className="text-4xl mx-auto mb-4" />
                        <h3 className="text-3xl font-bold">200+</h3>
                        <p className="mt-2 text-green-100">Transport Partners</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                        <FaMapMarkedAlt className="text-4xl mx-auto mb-4" />
                        <h3 className="text-3xl font-bold">100+</h3>
                        <p className="mt-2 text-green-100">Routes Covered</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                        <FaStar className="text-4xl mx-auto mb-4" />
                        <h3 className="text-3xl font-bold">4.9/5</h3>
                        <p className="mt-2 text-green-100">Customer Rating</p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PlatformStats;