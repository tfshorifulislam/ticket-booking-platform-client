import React from 'react';
import {
    FaShieldAlt,
    FaClock,
    FaTicketAlt,
    FaHeadset,
} from 'react-icons/fa';

const WhyChooseUs = () => {
    const features = [
        {
            icon: <FaTicketAlt />,
            title: 'Easy Ticket Booking',
            description:
                'Book bus, train, launch, and flight tickets in just a few clicks.',
        },
        {
            icon: <FaShieldAlt />,
            title: 'Secure Payments',
            description:
                'Your transactions are protected with safe and secure payment methods.',
        },
        {
            icon: <FaClock />,
            title: '24/7 Availability',
            description:
                'Book tickets anytime, anywhere without visiting ticket counters.',
        },
        {
            icon: <FaHeadset />,
            title: 'Customer Support',
            description:
                'Our support team is always ready to help you with your bookings.',
        },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Why Choose Us?
                    </h2>
                    <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                        Experience a smarter, faster, and more reliable way to
                        book your travel tickets.
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300"
                        >
                            <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-2xl mb-4">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {feature.title}
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;