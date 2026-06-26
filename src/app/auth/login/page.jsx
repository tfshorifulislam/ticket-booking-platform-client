'use client';

import { signIn } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const router = useRouter()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        const { data, error } = await signIn.email({
            email,
            password,
        })

        if (error) {
            console.error("Signup error:", error);
            alert(error.message);
            return;
        }
        if (data) {
            console.log("Signup successful:", data);
            toast.success("Signup successful! Please check your email to verify your account.");
            router.push("/");
            router.refresh();
        }

        console.log(formData);

    };

    return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/30 flex items-center justify-center px-4 py-10 transition-colors duration-300">

    <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-green-100 dark:border-zinc-800 rounded-3xl shadow-xl p-8">

      {/* Header */}
      <div className="text-center mb-8">

        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12l5 5L20 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome Back
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Login to your TicketBari account
        </p>

      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>

        {/* Password */}
        <div>

          <div className="flex justify-between items-center mb-2">

            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>

            <a
              href="/forgot-password"
              className="text-sm text-green-600 dark:text-green-400 hover:underline"
            >
              Forgot Password?
            </a>

          </div>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />

        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          Login
        </button>

      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-700"></div>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          OR
        </span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-700"></div>
      </div>

      {/* Register */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{" "}
        <Link
          href="/auth/registration"
          className="font-semibold text-green-600 dark:text-green-400 hover:underline"
        >
          Register
        </Link>
      </p>

    </div>

  </div>
);
};

export default LoginPage;