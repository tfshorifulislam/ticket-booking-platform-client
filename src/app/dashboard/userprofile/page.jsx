'use client';

import { useSession } from '@/lib/auth-client';
import Image from 'next/image';
import React from 'react';

const UserProfile = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        Loading Profile...
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        
        {/* Cover */}
        <div className="h-32 bg-green-600" />

        {/* Profile Section */}
        <div className="px-6 pb-6">
          <div className="-mt-14">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || 'User'}
                width={100}
                height={100}
                className="rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div className="w-[100px] h-[100px] rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
          </div>

          <div className="mt-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.name || 'Unknown User'}
            </h2>

            <p className="text-gray-500">
              {user?.email || 'No Email'}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-gray-50">
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold text-gray-800">
                {user?.name || 'N/A'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800">
                {user?.email || 'N/A'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50">
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-semibold capitalize text-gray-800">
                {user?.role || 'N/A'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50">
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-semibold text-gray-800 break-all">
                {user?.id || 'N/A'}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;