'use client';

import React from 'react';
import Marquee from 'react-fast-marquee';
import { FaStar } from 'react-icons/fa';

const Reviews = () => {
    const reviews = [
        {
            name: 'Abdullah Al Mamun',
            role: 'Daily Traveler',
            comment: 'TicketBari makes my travel so easy. Booking tickets takes less than a minute!',
            rating: 5,
        },
        {
            name: 'Nusrat Jahan',
            role: 'Student',
            comment: 'Very smooth UI and fast booking system. I love the experience!',
            rating: 4,
        },
        {
            name: 'Rahim Uddin',
            role: 'Businessman',
            comment: 'Reliable platform. I always use it for my business trips.',
            rating: 5,
        },
        {
            name: 'Shakib Hasan',
            role: 'Traveler',
            comment: 'Great service and trusted transport partners. Highly recommended!',
            rating: 5,
        },
        {
            name: 'Farhana Islam',
            role: 'University Student',
            comment: 'I can easily book tickets from my phone. Saves so much time!',
            rating: 5,
        },
        {
            name: 'Mohammad Rafiq',
            role: 'Office Employee',
            comment: 'Very convenient for daily office travel. Smooth experience.',
            rating: 4,
        },
        {
            name: 'Tanvir Ahmed',
            role: 'Entrepreneur',
            comment: 'Great platform for intercity travel booking. Highly reliable.',
            rating: 5,
        },
        {
            name: 'Sadia Afrin',
            role: 'Frequent Traveler',
            comment: 'Love the interface and fast booking process. No hassle at all.',
            rating: 5,
        },
        {
            name: 'Imran Hossain',
            role: 'Engineer',
            comment: 'I use it regularly for work travel. Very stable system.',
            rating: 4,
        },
        {
            name: 'Mst. Ayesha Khatun',
            role: 'Housewife',
            comment: 'Now I can book tickets for my family without any help.',
            rating: 5,
        },
        {
            name: 'Ratul Islam',
            role: 'Freelancer',
            comment: 'Simple, fast and reliable ticket booking platform.',
            rating: 5,
        },
        {
            name: 'Sabbir Rahman',
            role: 'Driver',
            comment: 'Good platform for checking routes and schedules easily.',
            rating: 4,
        }
    ];

    return (
        <section className="py-14 bg-gradient-to-b from-white via-green-50/40 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 transition-colors duration-300">
            <div className="w-11/12 mx-auto">

                {/* Heading */}
                <div className="text-center mb-10">
                    <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm font-medium">
                        Customer Feedback
                    </span>

                    <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                        What Our Users Say
                    </h2>

                    <p className="mt-3 text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Real experiences from thousands of happy travelers using TicketBari.
                    </p>
                </div>

                <Marquee
                    speed={50}
                    pauseOnHover
                    gradient
                    gradientColor="transparent"
                >
                    {reviews.map((review, index) => (
                        <div key={index} className="mx-4">

                            <div className="w-80 bg-white dark:bg-zinc-900 border border-green-100 dark:border-zinc-700 rounded-2xl p-6 shadow-sm hover:shadow-md dark:hover:shadow-zinc-900/40 hover:border-green-300 dark:hover:border-green-500 transition-all duration-300">

                                {/* Stars */}
                                <div className="flex gap-1 mb-3 text-yellow-400">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>

                                {/* Comment */}
                                <p className="text-gray-600 dark:text-zinc-300 text-sm leading-relaxed">
                                    "{review.comment}"
                                </p>

                                {/* User */}
                                <div className="mt-5 border-t border-green-100 dark:border-zinc-700 pt-4">
                                    <h4 className="font-semibold text-gray-800 dark:text-white">
                                        {review.name}
                                    </h4>

                                    <p className="text-xs text-gray-500 dark:text-zinc-400">
                                        {review.role}
                                    </p>
                                </div>

                            </div>

                        </div>
                    ))}
                </Marquee>

            </div>
        </section>
    );
};

export default Reviews;