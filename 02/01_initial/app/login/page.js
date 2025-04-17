// app/login/page.js (Relevant part of the component)
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useAuth } from '../context/AuthContext'; // Adjust path if needed

export default function LoginPage() {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    // const { loginUser } = useAuth(); // Get loginUser from context



    // Determine message color (remains the same)
    const messageIsError = message.toLowerCase().includes('fail') || message.toLowerCase().includes('invalid') || message.toLowerCase().includes('error') || message.toLowerCase().includes('fill') || message.toLowerCase().includes('missing') || message.toLowerCase().includes('could not');
    const messageColor = messageIsError ? 'text-red-600' : 'text-green-600';


    // --- Rest of the component's JSX (form, message display, etc.) remains the same ---
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            {/* Form container */}
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                {/* ... H1, Form, Inputs, Button ... */}
                 <h1 className="text-2xl font-bold text-center text-gray-900">
                    Log in to your account
                </h1>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input type="text" id="username" name="username" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50 disabled:bg-gray-200" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" id="password" name="password" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50 disabled:bg-gray-200" />
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
                            Login
                        </button>
                    </div>
                </form>
               {/* Link to Register */}
               <p className="mt-4 text-center text-sm text-gray-600">
                   Don't have an account?{' '}
                   <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">Register here</a>
               </p>
            </div>
        </div>
    );
}