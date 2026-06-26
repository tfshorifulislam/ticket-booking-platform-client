'use client';

import { useSession } from '@/lib/auth-client';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

const AdminProfile = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 animate-pulse">
        <div className="h-24 bg-green-50 rounded-xl" />
      </div>
    );
  }

  const user = session?.user;
   
    if (!user) {
      redirect('/auth/login')
    }

  return (
  <div className="max-w-4xl mx-auto px-4">

    <div className="relative overflow-hidden rounded-3xl border border-green-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-emerald-950/40" />

      <div className="relative p-6 sm:p-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

          {/* Avatar */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-green-100 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-md flex items-center justify-center">

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
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </span>
            )}

          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {user?.name || "Admin User"}
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2 break-all">
              {user?.email || "admin@email.com"}
            </p>

            <span className="inline-flex mt-4 px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300 capitalize">
              {user?.role || "admin"}
            </span>

          </div>

        </div>

        {/* Divider */}
        <div className="my-8 border-t border-green-100 dark:border-zinc-700" />

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Full Name */}
          <div className="rounded-2xl bg-white dark:bg-zinc-800 border border-green-100 dark:border-zinc-700 p-5 hover:shadow-lg transition">
            <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Full Name
            </p>

            <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
              {user?.name || "—"}
            </p>
          </div>

          {/* Email */}
          <div className="rounded-2xl bg-white dark:bg-zinc-800 border border-green-100 dark:border-zinc-700 p-5 hover:shadow-lg transition">
            <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Email Address
            </p>

            <p className="mt-2 text-gray-900 dark:text-gray-200 break-all">
              {user?.email || "—"}
            </p>
          </div>

          {/* Role */}
          <div className="rounded-2xl bg-white dark:bg-zinc-800 border border-green-100 dark:border-zinc-700 p-5 hover:shadow-lg transition">
            <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Role
            </p>

            <p className="mt-2 text-lg font-bold text-green-600 dark:text-green-400 capitalize">
              {user?.role || "admin"}
            </p>
          </div>

          {/* Admin ID */}
          <div className="rounded-2xl bg-white dark:bg-zinc-800 border border-green-100 dark:border-zinc-700 p-5 hover:shadow-lg transition">
            <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Admin ID
            </p>

            <p className="mt-2 font-mono text-sm text-gray-600 dark:text-gray-300 break-all">
              {user?.id || "—"}
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>
);
};

export default AdminProfile;