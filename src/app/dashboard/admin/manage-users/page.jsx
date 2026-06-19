'use client';

import React, { useState } from 'react';
import { FaUserShield, FaUserTie, FaBan } from 'react-icons/fa';

const initialUsers = [
  {
    id: 1,
    name: 'Rahim Uddin',
    email: 'rahim@gmail.com',
    role: 'user',
    isFraud: false,
  },
  {
    id: 2,
    name: 'Karim Vendor',
    email: 'karim@gmail.com',
    role: 'vendor',
    isFraud: false,
  },
  {
    id: 5,
    name: 'shamim Vendor',
    email: 'kardsim@gmail.com',
    role: 'vendor',
    isFraud: false,
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@gmail.com',
    role: 'admin',
    isFraud: false,
  },
];

const ManageUsers = () => {
  const [users, setUsers] = useState(initialUsers);

  // Make Admin
  const handleMakeAdmin = (id) => {
    const updated = users.map((u) =>
      u.id === id
        ? { ...u, role: 'admin' }
        : u
    );

    setUsers(updated);

    // TODO: API CALL → PATCH /users/:id { role: 'admin' }
  };

  // Make Vendor
  const handleMakeVendor = (id) => {
    const updated = users.map((u) =>
      u.id === id
        ? { ...u, role: 'vendor', isFraud: false }
        : u
    );

    setUsers(updated);

    // TODO: API CALL → PATCH /users/:id { role: 'vendor' }
  };

  // Mark Fraud Vendor
  const handleMarkFraud = (id) => {
    const updated = users.map((u) =>
      u.id === id
        ? { ...u, isFraud: true }
        : u
    );

    setUsers(updated);

    // TODO (IMPORTANT BACKEND LOGIC):
    // 1. vendor.isFraud = true
    // 2. hide all tickets of this vendor
    // 3. block ticket creation permanently
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Manage Users
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Control user roles and vendor safety status
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-green-100 rounded-2xl shadow-sm overflow-x-auto">

        <table className="min-w-full text-sm">

          {/* Head */}
          <thead className="bg-green-50 text-gray-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-6 py-4">Email</th>
              <th className="text-left px-6 py-4">Role</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">

            {users.map((user) => {
              const isVendor = user.role === 'vendor';
              const isFraud = user.isFraud;

              return (
                <tr
                  key={user.id}
                  className={`hover:bg-green-50/40 transition ${
                    isFraud ? 'opacity-50' : ''
                  }`}
                >

                  {/* Name */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.name}
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-gray-600">
                    {user.email}
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full border bg-gray-50 text-gray-700 capitalize">
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {isFraud ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-600 border border-red-100">
                        Fraud Vendor
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
                        Active
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">

                    <div className="flex flex-wrap gap-2">

                      {/* Make Admin */}
                      <button
                        onClick={() => handleMakeAdmin(user.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                      >
                        <FaUserShield />
                        Admin
                      </button>

                      {/* Make Vendor */}
                      <button
                        onClick={() => handleMakeVendor(user.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                      >
                        <FaUserTie />
                        Vendor
                      </button>

                      {/* Fraud Button (ONLY vendor & not fraud yet) */}
                      {isVendor && !isFraud && (
                        <button
                          onClick={() => handleMarkFraud(user.id)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                        >
                          <FaBan />
                          Fraud
                        </button>
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
  );
};

export default ManageUsers;