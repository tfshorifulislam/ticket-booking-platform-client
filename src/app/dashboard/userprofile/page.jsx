'use client';

import { useSession } from '@/lib/auth-client';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

const UserProfile = () => {
  const { data: session, isPending } = useSession();
  

  if (isPending) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 animate-pulse">
        <div className="h-24 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  const user = session?.user;

 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-black py-10 px-4 transition-colors duration-300">

    <div className="max-w-4xl mx-auto">

      {/* Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-900/10 dark:via-zinc-900 dark:to-black" />

        <div className="relative p-6 sm:p-10">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

            {/* Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-md flex items-center justify-center">

              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              )}

            </div>

            {/* Info */}
            <div className="text-center sm:text-left">

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {user?.name || 'Anonymous User'}
              </h1>

              <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1 break-all">
                {user?.email || '—'}
              </p>

              <span className="inline-flex mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 capitalize">
                {user?.role || 'user'}
              </span>

            </div>

          </div>

          {/* Divider */}
          <div className="my-8 border-t border-slate-200 dark:border-zinc-800" />

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:shadow-md transition">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Full Name
              </p>
              <p className="mt-1 text-slate-900 dark:text-white font-semibold">
                {user?.name || '—'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:shadow-md transition">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Email
              </p>
              <p className="mt-1 text-slate-900 dark:text-white font-semibold break-all">
                {user?.email || '—'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:shadow-md transition">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Role
              </p>
              <p className="mt-1 text-green-600 dark:text-green-400 font-bold capitalize">
                {user?.role || 'user'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:shadow-md transition">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                User ID
              </p>
              <p className="mt-1 text-xs font-mono text-slate-500 dark:text-zinc-400 break-all">
                {user?.id || '—'}
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
);
};

export default UserProfile;