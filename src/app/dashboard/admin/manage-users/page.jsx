'use client';

import React, { useEffect, useState } from 'react';
import { FaUserShield, FaUserTie, FaBan, FaCheck } from 'react-icons/fa';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users');
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

  // Make Admin Action
  const handleMakeAdmin = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/make-admin/${id}`, {
        method: 'PATCH',
      });
      const data = await res.json();

      if (data.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, role: 'admin' } : user
          )
        );
      }
    } catch (error) {
      console.error('Error upgrading to Admin:', error);
    }
  };

  // Make Vendor Action
  const handleMakeVendor = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/make-vendor/${id}`, {
        method: 'PATCH',
      });
      const data = await res.json();

      if (data.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id
              ? { ...user, role: 'vendor', isFraud: false }
              : user
          )
        );
      }
    } catch (error) {
      console.error('Error upgrading to Vendor:', error);
    }
  };

  // Mark Vendor as Fraud Action
  const handleMarkFraud = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/fraud/${id}`, {
        method: 'PATCH',
      });
      const data = await res.json();

      if (data.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, isFraud: true } : user
          )
        );
      }
    } catch (error) {
      console.error('Error flaggin fraud vendor:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
        <p className="text-gray-500 mt-1">
          Control user roles and manage vendor safety
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-green-50 border-b border-green-100">
              <tr>
                <th className="text-left px-6 py-5 font-semibold text-gray-700">Name</th>
                <th className="text-left px-6 py-5 font-semibold text-gray-700">Email</th>
                <th className="text-left px-6 py-5 font-semibold text-gray-700">Role</th>
                <th className="text-left px-6 py-5 font-semibold text-gray-700">Status</th>
                <th className="text-center px-6 py-5 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.map((user) => {
                const isVendor = user.role === 'vendor';
                const isFraud = user.isFraud;

                return (
                  <tr
                    key={user._id}
                    className={`hover:bg-green-50/50 transition-all ${isFraud ? 'bg-red-50/40 opacity-75' : ''}`}
                  >
                    <td className="px-6 py-5 font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-5 text-gray-600">{user.email}</td>

                    {/* Role Tag */}
                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-1.5 text-xs font-medium rounded-full capitalize ${
                          user.role === 'admin'
                            ? 'bg-indigo-100 text-indigo-700'
                            : user.role === 'vendor'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {user.role || 'user'}
                      </span>
                    </td>

                    {/* Status Tag */}
                    <td className="px-6 py-5">
                      {isFraud ? (
                        <span className="px-4 py-1.5 text-xs font-medium rounded-full bg-red-100 text-red-700 border border-red-200">
                          Fraud Vendor
                        </span>
                      ) : (
                        <span className="px-4 py-1.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                          Active
                        </span>
                      )}
                    </td>

                    {/* Actions Row */}
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-2 justify-center">
                        <button
                          onClick={() => handleMakeAdmin(user._id)}
                          disabled={user.role === 'admin'}
                          className="flex items-center gap-2 px-4 py-2 text-xs rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FaUserShield />
                          Make Admin
                        </button>

                        <button
                          onClick={() => handleMakeVendor(user._id)}
                          disabled={user.role === 'vendor'}
                          className="flex items-center gap-2 px-4 py-2 text-xs rounded-xl bg-green-600 hover:bg-green-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FaUserTie />
                          Make Vendor
                        </button>

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
                          <div className="flex items-center gap-2 px-4 py-2 text-xs rounded-xl bg-red-50 text-red-600 font-medium border border-red-200">
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
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;