'use client';

import React, { useEffect, useState } from 'react';
import {
  FaUserShield,
  FaUserTie,
  FaBan,
  FaCheck,
} from 'react-icons/fa';

import {
  allUser,
  makeAdmin,
  makeVendor,
  markFraudVendor,
} from '@/lib/api/ticket';
import { useSession } from '@/lib/auth-client';
import { redirect } from 'next/navigation';

const ManageUsers = () => {

  const { data: session } = useSession()

  if (!session) {
    redirect('/auth/login')
  }

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= Fetch Users =================
  const fetchUsers = async () => {
    try {
      const data = await allUser();
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Manage Users
        </h1>
        <p className="text-gray-500 mt-1">
          Control user roles and manage vendor safety
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-green-50 border-b border-green-100">
              <tr>
                <th className="text-left px-6 py-5">Name</th>
                <th className="text-left px-6 py-5">Email</th>
                <th className="text-left px-6 py-5">Role</th>
                <th className="text-left px-6 py-5">Status</th>
                <th className="text-center px-6 py-5">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.map((user) => {
                const isVendor = user.role === 'vendor';
                const isFraud = user.isFraud;

                return (
                  <tr
                    key={user._id}
                    className={`hover:bg-green-50 transition ${isFraud
                        ? 'bg-red-50/40 opacity-75'
                        : ''
                      }`}
                  >
                    <td className="px-6 py-5 font-medium">
                      {user.name}
                    </td>

                    <td className="px-6 py-5">
                      {user.email}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${user.role === 'admin'
                            ? 'bg-indigo-100 text-indigo-700'
                            : user.role === 'vendor'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                      >
                        {user.role || 'user'}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      {isFraud ? (
                        <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700 border border-red-200">
                          Fraud Vendor
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                          Active
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex flex-wrap justify-center gap-2">

                        {user.role !== 'admin' && (
                          <button
                            onClick={() =>
                              handleMakeAdmin(user._id)
                            }
                            className="flex items-center gap-2 px-4 py-2 text-xs rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                          >
                            <FaUserShield />
                            Make Admin
                          </button>
                        )}

                        {user.role !== 'vendor' && (
                          <button
                            onClick={() =>
                              handleMakeVendor(user._id)
                            }
                            className="flex items-center gap-2 px-4 py-2 text-xs rounded-xl bg-green-600 hover:bg-green-700 text-white"
                          >
                            <FaUserTie />
                            Make Vendor
                          </button>
                        )}

                        {isVendor && !isFraud && (
                          <button
                            onClick={() =>
                              handleMarkFraud(user._id)
                            }
                            className="flex items-center gap-2 px-4 py-2 text-xs rounded-xl bg-red-600 hover:bg-red-700 text-white"
                          >
                            <FaBan />
                            Mark Fraud
                          </button>
                        )}

                        {isVendor && isFraud && (
                          <div className="flex items-center gap-2 px-4 py-2 text-xs rounded-xl bg-red-50 text-red-600 border border-red-200">
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
            <div className="text-center py-12 text-gray-500">
              No users found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;