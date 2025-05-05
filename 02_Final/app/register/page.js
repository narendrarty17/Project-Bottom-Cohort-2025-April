// app/register/page.js
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter(); // Uncomment if redirecting

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username')?.toString().trim();
        const password = formData.get('password')?.toString().trim();
        const confirmPassword = formData.get('confirmPassword')?.toString().trim();

        // Client-side Validation (keep as is)
        if (!username || !password || !confirmPassword) {
            setMessage('Please fill in all fields.');
            setIsLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            setIsLoading(false);
            return;
        }
         if (password.length < 6) {
             setMessage('Password must be at least 6 characters long.');
             setIsLoading(false);
             return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const result = await response.json();
            setMessage(result.message);

            if (response.ok) {
                 console.log('Registration successful via API');
                 event.target.reset();
                 router.push('/login'); // Uncomment for redirect
            } else {
                console.error('API Registration failed:', result.message);
            }
        } catch (error) {
            console.error('Network or unexpected error during registration:', error);
            setMessage('Registration failed. Please check your connection and try again.');
        } finally {
             setIsLoading(false);
        }
    };

    // Determine message color based on content
    const messageIsSuccess = message.toLowerCase().includes('successful');
    const messageColor = messageIsSuccess ? 'text-green-600' : 'text-red-600';

    return (
        // Main container: center content, add padding, set min height
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            {/* Form container: max width, padding, background, shadow, rounded corners */}
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-900">
                    Create your account
                </h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Username Field */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            disabled={isLoading}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50 disabled:bg-gray-200"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            minLength="6"
                            disabled={isLoading}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50 disabled:bg-gray-200"
                        />
                    </div>

                    {/* Confirm Password Field */}
                     <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            minLength="6"
                            disabled={isLoading}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50 disabled:bg-gray-200"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>

                {/* Message Area */}
                {message && (
                    <p className={`text-sm text-center ${messageColor} mt-4`}>
                        {message}
                    </p>
                )}

                 {/* Link to Login */}
                 <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                        Log in here
                    </a>
                </p>
            </div>
        </div>
    );
}