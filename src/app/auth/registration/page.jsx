'use client';

import { authClient, signUp } from '@/lib/auth-client';
import { Label, Radio, RadioGroup } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

const RegistrationPage = () => {
  const router = useRouter()
  const [role, setRole] = useState("user");
  const [isFraud, setIsFraud] = useState(false);

  const handleSingUp = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log(userData);

    const { data, error } = await signUp.email({
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role,
      isFraud
    })

    if (error) {
      console.error("Signup error:", error);
      toast.error(error.message);
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

const handleLoginWithGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
  });
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-black flex items-center justify-center px-4 py-10 transition-colors duration-300">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Create Account
          </h1>

          <p className="text-slate-500 dark:text-zinc-400 mt-2">
            Join TicketBari and start booking tickets effortlessly.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSingUp} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
              minLength={2}
              className="w-full rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition"
            />
          </div>

          {/* Role */}
          <div className="space-y-3">
            <Label className="text-slate-700 dark:text-zinc-300">
              Select Role
            </Label>

            <div className="rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 p-4">
              <RadioGroup
                defaultValue="user"
                name="role"
                orientation="horizontal"
                onChange={(value) => setRole(value)}
              >
                <div className="flex gap-8">
                  <Radio value="user">
                    <Radio.Content>
                      <Radio.Control>
                        <Radio.Indicator />
                      </Radio.Control>

                      <span className="text-slate-700 dark:text-zinc-300">
                        User
                      </span>
                    </Radio.Content>
                  </Radio>

                  <Radio value="vendor">
                    <Radio.Content>
                      <Radio.Control>
                        <Radio.Indicator />
                      </Radio.Control>

                      <span className="text-slate-700 dark:text-zinc-300">
                        Vendor
                      </span>
                    </Radio.Content>
                  </Radio>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Minimum 8 characters"
              required
              minLength={8}
              className="w-full rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-semibold py-3 transition-all duration-300 shadow-lg shadow-green-600/20"
          >
            Create Account
          </button>
        </form>

        <button
          onClick={handleLoginWithGoogle}
          className="flex cursor-pointer h-12 w-full mt-4 items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
        >
          <FcGoogle className="text-xl" />

          Continue with Google
        </button>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-green-600 dark:text-green-400 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;