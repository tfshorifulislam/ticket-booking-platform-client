'use client';

import Link from 'next/link';
import { FaCheckCircle, FaTicketAlt } from 'react-icons/fa';

const SuccessPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 flex items-center justify-center px-4">

            <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl border border-emerald-100 p-10 text-center">

                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
                        <FaCheckCircle className="text-6xl text-emerald-600" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    Payment Successful 🎉
                </h1>

                <p className="text-gray-600 mb-8">
                    Your ticket booking has been confirmed successfully.
                    Thank you for choosing our platform.
                </p>

                {/* Info Card */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 mb-8">

                    <div className="flex items-center justify-center gap-3 mb-3">
                        <FaTicketAlt className="text-emerald-600 text-xl" />
                        <span className="font-semibold text-emerald-700">
                            Booking Confirmed
                        </span>
                    </div>

                    <p className="text-sm text-gray-600">
                        Your payment has been received and your booking status
                        has been updated successfully.
                    </p>

                </div>

                {/* Buttons */}
                <div className="space-y-3">

                    <Link
                        href="/dashboard/transactions"
                        className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-semibold transition"
                    >
                        View My Tickets
                    </Link>

                    <Link
                        href="/"
                        className="block w-full border border-gray-200 hover:border-gray-300 py-3 rounded-2xl font-medium text-gray-700 transition"
                    >
                        Back To Home
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default SuccessPage;