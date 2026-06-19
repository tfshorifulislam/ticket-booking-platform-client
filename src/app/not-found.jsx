import Link from 'next/link';
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4">

      <div className="text-center max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center">
            <FaExclamationTriangle className="text-green-600 text-3xl" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-5xl font-bold text-gray-900">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-3 text-xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-500">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-block mt-6 px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
        >
          Go Back Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;