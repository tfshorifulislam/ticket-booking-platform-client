import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const PopularRoutes = () => {
    const routes = [
        {
            from: 'Dhaka',
            to: 'Chattogram',
            price: '৳850',
        },
        {
            from: 'Dhaka',
            to: 'Cox’s Bazar',
            price: '৳1200',
        },
        {
            from: 'Dhaka',
            to: 'Sylhet',
            price: '৳700',
        },
        {
            from: 'Dhaka',
            to: 'Khulna',
            price: '৳650',
        },
        {
            from: 'Dhaka',
            to: 'Rajshahi',
            price: '৳750',
        },
        {
            from: 'Dhaka',
            to: 'Barishal',
            price: '৳600',
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">

                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Popular Routes
                    </h2>
                    <p className="mt-3 text-gray-500">
                        Discover the most booked routes across Bangladesh.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {routes.map((route, index) => (
                        <div
                            key={index}
                            className="border rounded-2xl p-6 hover:shadow-lg transition"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg">
                                    {route.from}
                                </h3>

                                <FaArrowRight className="text-green-600" />

                                <h3 className="font-semibold text-lg">
                                    {route.to}
                                </h3>
                            </div>

                            <div className="mt-5 flex items-center justify-between">
                                <span className="text-gray-500">
                                    Starting From
                                </span>

                                <span className="font-bold text-green-600">
                                    {route.price}
                                </span>
                            </div>

                            <button className="mt-5 w-full py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition">
                                View Tickets
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PopularRoutes;