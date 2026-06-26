'use client';

import { useSession } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import React from 'react';

const dummyTransactions = [
  {
    id: 'txn_001',
    amount: 1000,
    ticketTitle: 'Dhaka to Chittagong Express',
    date: '2026-06-20',
  },
  {
    id: 'txn_002',
    amount: 800,
    ticketTitle: 'Sylhet Night Coach',
    date: '2026-06-19',
  },
  {
    id: 'txn_003',
    amount: 1200,
    ticketTitle: 'Rajshahi Fast Line',
    date: '2026-06-18',
  },
];

const TransactionsPage = () => {
  const { data: session } = useSession()

 return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    
    {/* Header */}
    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6 tracking-tight">
      Transaction History
    </h1>

    {/* Table Container */}
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-x-auto">

      <table className="min-w-full text-sm">

        {/* Table Head */}
        <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">
          <tr>
            <th className="text-left px-6 py-4">Transaction ID</th>
            <th className="text-left px-6 py-4">Ticket Title</th>
            <th className="text-left px-6 py-4">Amount</th>
            <th className="text-left px-6 py-4">Payment Date</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

          {dummyTransactions.map((txn) => (
            <tr
              key={txn.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >

              {/* ID */}
              <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-300">
                {txn.id}
              </td>

              {/* Ticket */}
              <td className="px-6 py-4 text-slate-800 dark:text-slate-100 font-medium">
                {txn.ticketTitle}
              </td>

              {/* Amount */}
              <td className="px-6 py-4 font-semibold text-emerald-600">
                ৳ {txn.amount}
              </td>

              {/* Date */}
              <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                {txn.date}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  </div>
);
};

export default TransactionsPage;