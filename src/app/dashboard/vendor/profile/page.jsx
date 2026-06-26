'use client';

import { useSession } from '@/lib/auth-client';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

const VendorProfile = () => {
  const { data: session, isPending } = useSession();

  if (session?.user?.role !== "vendor") {
    redirect("/");
  }

  if (isPending) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 animate-pulse">
        <div className="h-24 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Card */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-slate-900 shadow-sm">

        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950" />

        <div className="relative p-6 sm:p-10">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

            {/* Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-emerald-100 dark:border-emerald-800 bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center">

              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-emerald-600">
                  {user?.name?.charAt(0)?.toUpperCase() || 'V'}
                </span>
              )}

            </div>

            {/* Info */}
            <div className="text-center sm:text-left">

              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                {user?.name || 'Vendor Name'}
              </h1>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 break-all">
                {user?.email || 'vendor@email.com'}
              </p>

              <span className="inline-flex mt-3 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800 capitalize">
                {user?.role || 'vendor'}
              </span>

            </div>

          </div>

          {/* Divider */}
          <div className="my-8 border-t border-emerald-100 dark:border-emerald-800" />

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-800 hover:shadow-sm transition">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Vendor Name
              </p>
              <p className="mt-1 text-slate-900 dark:text-white font-medium">
                {user?.name || '—'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-800 hover:shadow-sm transition">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Email Address
              </p>
              <p className="mt-1 text-slate-900 dark:text-white font-medium break-all">
                {user?.email || '—'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-800 hover:shadow-sm transition">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Role
              </p>
              <p className="mt-1 text-emerald-600 dark:text-emerald-400 font-semibold capitalize">
                {user?.role || 'vendor'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-800 hover:shadow-sm transition">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Vendor ID
              </p>
              <p className="mt-1 text-xs font-mono text-slate-500 break-all">
                {user?.id || '—'}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default VendorProfile;