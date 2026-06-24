'use client';

import { signUp } from '@/lib/auth-client';
import { Label, Radio, RadioGroup } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Account
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Register to book tickets easily
                    </p>
                </div>

                <form onSubmit={handleSingUp} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            required
                            validate={(value) => {
                                if (value.length < 2) {
                                    return "Name must be at least 2 characters";
                                }
                                return null;
                            }}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            validate={(value) => {
                                if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                                ) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            required
                        />
                    </div>

                    {/* Role */}
                    <div className="flex flex-col gap-4">
                        <Label>Role</Label>

                        <RadioGroup
                            onChange={(value) => setRole(value)}
                            defaultValue="user"
                            name="role"
                            orientation="horizontal"
                        >
                            <Radio value="user">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    User
                                </Radio.Content>
                            </Radio>
                            <Radio value="vendor">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    Vendor
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            minLength={8}
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }

                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain at least one uppercase letter";
                                }

                                if (!/[0-9]/.test(value)) {
                                    return "Password must contain at least one number";
                                }

                                return null;
                            }}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{' '}
                    <Link
                        href="/auth/login"
                        className="text-green-600 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegistrationPage;