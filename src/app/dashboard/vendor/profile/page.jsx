'use client';

import { useSession } from '@/lib/auth-client';
import Image from 'next/image';
import React from 'react';

const VendorProfile = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 animate-pulse">
        <div className="h-24 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="max-w-4xl mx-auto">

      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">

        {/* soft vendor background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-green-50" />

        <div className="relative p-6 sm:p-10">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

            {/* Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-emerald-100 bg-white shadow-sm flex items-center justify-center">

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

              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
                {user?.name || 'Vendor Name'}
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                {user?.email || 'vendor@email.com'}
              </p>

              <span className="inline-flex mt-3 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 capitalize">
                {user?.role || 'vendor'}
              </span>

            </div>

          </div>

          {/* Divider */}
          <div className="my-8 border-t border-emerald-100" />

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div className="p-4 rounded-xl bg-white border border-emerald-100 hover:shadow-sm transition">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Vendor Name
              </p>
              <p className="mt-1 text-gray-900 font-medium">
                {user?.name || '—'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-emerald-100 hover:shadow-sm transition">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Email Address
              </p>
              <p className="mt-1 text-gray-900 font-medium break-all">
                {user?.email || '—'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-emerald-100 hover:shadow-sm transition">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Role
              </p>
              <p className="mt-1 text-emerald-600 font-semibold capitalize">
                {user?.role || 'vendor'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-emerald-100 hover:shadow-sm transition">
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Vendor ID
              </p>
              <p className="mt-1 text-xs font-mono text-gray-500 break-all">
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