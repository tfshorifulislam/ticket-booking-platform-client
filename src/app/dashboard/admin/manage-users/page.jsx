'use client';

import React, { useEffect, useState } from 'react';
import {
  FaUserShield,
  FaUserTie,
  FaBan,
  FaCheck,
} from 'react-icons/fa';

import {
  makeAdmin,
  makeVendor,
  markFraudVendor,
} from '@/lib/api/ticket';
import { authClient, useSession } from '@/lib/auth-client';
import { redirect } from 'next/navigation';

const ManageUsers = () => {

  const { data: session } = useSession()

  if (session?.user?.role !== "admin") {
    redirect("/");
  }

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= Fetch Users =================
  const fetchUsers = async () => {
    try {
      const { data: userToken } = await authClient.token()
      // console.log('token', userToken)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/all-user`, {
        headers: {
          authorization: `Bearer ${userToken?.token}`
        },
        cache: 'no-store'
      })
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= Make Admin =================
  const handleMakeAdmin = async (id) => {
    try {
      const data = await makeAdmin(id);

      if (data.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id
              ? {
                ...user,
                role: 'admin',
                isFraud: false,
              }
              : user
          )
        );
      }
    } catch (error) {
      console.error('Error making admin:', error);
    }
  };

  // ================= Make Vendor =================
  const handleMakeVendor = async (id) => {
    try {
      const data = await makeVendor(id);

      if (data.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id
              ? {
                ...user,
                role: 'vendor',
                isFraud: false,
              }
              : user
          )
        );
      }
    } catch (error) {
      console.error('Error making vendor:', error);
    }
  };

  // ================= Mark Fraud =================
  const handleMarkFraud = async (id) => {
    try {
      const data = await markFraudVendor(id);

      if (data.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id
              ? {
                ...user,
                isFraud: true,
              }
              : user
          )
        );
      }
    } catch (error) {
      console.error('Error marking fraud vendor:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="animate-spin h-12 w-12 rounded-full border-b-2 border-green-600"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Manage Users
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Control user roles and manage vendor safety
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-zinc-800">
              <tr>
                <th className="text-left px-6 py-5 text-gray-700 dark:text-gray-300">
                  Name
                </th>

                <th className="text-left px-6 py-5 text-gray-700 dark:text-gray-300">
                  Email
                </th>

                <th className="text-left px-6 py-5 text-gray-700 dark:text-gray-300">
                  Role
                </th>

                <th className="text-left px-6 py-5 text-gray-700 dark:text-gray-300">
                  Status
                </th>

                <th className="text-center px-6 py-5 text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {users.map((user) => {
                const isVendor = user.role === "vendor";
                const isFraud = user.isFraud;

                return (
                  <tr
                    key={user._id}
                    className={`transition hover:bg-green-50 dark:hover:bg-zinc-800 ${isFraud
                      ? "bg-red-50/40 dark:bg-red-900/10"
                      : ""
                      }`}
                  >
                    <td className="px-6 py-5 font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </td>

                    <td className="px-6 py-5 text-gray-600 dark:text-gray-300">
                      {user.email}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${user.role === "admin"
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                          : user.role === "vendor"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-gray-100 text-gray-700 dark:bg-zinc-700 dark:text-gray-200"
                          }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      {isFraud ? (
                        <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800">
                          Fraud Vendor
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          Active
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex flex-wrap justify-center gap-2">

                        {user.role !== "admin" && (
                          <button
                            onClick={() => handleMakeAdmin(user._id)}
                            className="flex items-center gap-2 px-4 py-2 text-xs rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
                          >
                            <FaUserShield />
                            Make Admin
                          </button>
                        )}

                        {user.role !== "vendor" && (
                          <button
                            onClick={() => handleMakeVendor(user._id)}
                            className="flex items-center gap-2 px-4 py-2 text-xs rounded-xl bg-green-600 hover:bg-green-700 text-white transition"
                          >
                            <FaUserTie />
                            Make Vendor
                          </button>
                        )}

                        {isVendor && !isFraud && (
                          <button
                            onClick={() => handleMarkFraud(user._id)}
                            className="flex items-center gap-2 px-4 py-2 text-xs rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
                          >
                            <FaBan />
                            Mark Fraud
                          </button>
                        )}

                        {isVendor && isFraud && (
                          <div className="flex items-center gap-2 px-4 py-2 text-xs rounded-xl bg-red-50 text-red-600 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">
                            <FaCheck />
                            Fraud Marked
                          </div>
                        )}

                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No users found
            </div>
          )}
        </div>
      </div>

      {/* Mobile Card */}
      <div className="lg:hidden space-y-5">
        {users.length === 0 && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 text-center border dark:border-zinc-800 text-gray-500 dark:text-gray-400">
            No users found
          </div>
        )}

        {users.map((user) => {
          const isVendor = user.role === "vendor";
          const isFraud = user.isFraud;

          return (
            <div
              key={user._id}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm"
            >
              <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                {user.name}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 break-all">
                {user.email}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">

                <span
                  className={`px-3 py-1 rounded-full text-xs ${user.role === "admin"
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                    : user.role === "vendor"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-gray-100 text-gray-700 dark:bg-zinc-700 dark:text-gray-200"
                    }`}
                >
                  {user.role || "user"}
                </span>

                {isFraud ? (
                  <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                    Fraud
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    Active
                  </span>
                )}

              </div>

              <div className="grid gap-2 mt-5">

                {user.role !== "admin" && (
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex justify-center items-center gap-2"
                  >
                    <FaUserShield />
                    Make Admin
                  </button>
                )}

                {user.role !== "vendor" && (
                  <button
                    onClick={() => handleMakeVendor(user._id)}
                    className="w-full py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white flex justify-center items-center gap-2"
                  >
                    <FaUserTie />
                    Make Vendor
                  </button>
                )}

                {isVendor && !isFraud && (
                  <button
                    onClick={() => handleMarkFraud(user._id)}
                    className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white flex justify-center items-center gap-2"
                  >
                    <FaBan />
                    Mark Fraud
                  </button>
                )}

                {isVendor && isFraud && (
                  <div className="w-full py-2 rounded-xl bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 flex justify-center items-center gap-2">
                    <FaCheck />
                    Fraud Marked
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ManageUsers;