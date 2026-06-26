import React from 'react';
import { FaUsers, FaBus, FaMapMarkedAlt, FaStar } from 'react-icons/fa';

const PlatformStats = () => {
   return (
  <section className="relative overflow-hidden py-20 bg-gradient-to-b from-green-600 via-emerald-600 to-green-700 dark:from-black dark:via-zinc-950 dark:to-black transition-colors duration-500">

    {/* Background Glow */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full bg-white/10 dark:bg-white/[0.03] blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/10 dark:bg-white/[0.02] blur-[120px]" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4">

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">

        <span className="inline-block px-4 py-1 rounded-full bg-white/20 dark:bg-white/5 border border-white/20 dark:border-white/10 text-sm font-medium tracking-wide">
          WHY CHOOSE US
        </span>

        <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-white">
          Trusted by Thousands
          <span className="block text-green-100 dark:text-zinc-300 mt-2">
            Across Bangladesh
          </span>
        </h2>

        <p className="mt-5 text-lg text-green-50 dark:text-zinc-400">
          Experience seamless online ticket booking with secure payments,
          verified transport partners, and 24/7 customer support.
        </p>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Card */}
        <div className="group rounded-3xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/[0.03] backdrop-blur-xl p-8 text-center hover:-translate-y-2 hover:bg-white/20 dark:hover:bg-white/[0.06] transition-all duration-500">

          <div className="mx-auto w-16 h-16 rounded-2xl bg-white/20 dark:bg-white/5 flex items-center justify-center mb-6">
            <FaUsers className="text-3xl text-white" />
          </div>

          <h3 className="text-4xl font-bold text-white">
            50K+
          </h3>

          <p className="mt-3 text-green-100 dark:text-zinc-400">
            Happy Customers
          </p>

        </div>

        {/* Card */}
        <div className="group rounded-3xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/[0.03] backdrop-blur-xl p-8 text-center hover:-translate-y-2 hover:bg-white/20 dark:hover:bg-white/[0.06] transition-all duration-500">

          <div className="mx-auto w-16 h-16 rounded-2xl bg-white/20 dark:bg-white/5 flex items-center justify-center mb-6">
            <FaBus className="text-3xl text-white" />
          </div>

          <h3 className="text-4xl font-bold text-white">
            200+
          </h3>

          <p className="mt-3 text-green-100 dark:text-zinc-400">
            Transport Partners
          </p>

        </div>

        {/* Card */}
        <div className="group rounded-3xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/[0.03] backdrop-blur-xl p-8 text-center hover:-translate-y-2 hover:bg-white/20 dark:hover:bg-white/[0.06] transition-all duration-500">

          <div className="mx-auto w-16 h-16 rounded-2xl bg-white/20 dark:bg-white/5 flex items-center justify-center mb-6">
            <FaMapMarkedAlt className="text-3xl text-white" />
          </div>

          <h3 className="text-4xl font-bold text-white">
            100+
          </h3>

          <p className="mt-3 text-green-100 dark:text-zinc-400">
            Routes Covered
          </p>

        </div>

        {/* Card */}
        <div className="group rounded-3xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/[0.03] backdrop-blur-xl p-8 text-center hover:-translate-y-2 hover:bg-white/20 dark:hover:bg-white/[0.06] transition-all duration-500">

          <div className="mx-auto w-16 h-16 rounded-2xl bg-white/20 dark:bg-white/5 flex items-center justify-center mb-6">
            <FaStar className="text-3xl text-white" />
          </div>

          <h3 className="text-4xl font-bold text-white">
            4.9★
          </h3>

          <p className="mt-3 text-green-100 dark:text-zinc-400">
            Customer Rating
          </p>

        </div>

      </div>

    </div>
  </section>
);
};

export default PlatformStats;