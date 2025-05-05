// app/login/page.js (Relevant part of the component)
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

export default function LoginPage() {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { loginUser } = useAuth(); // Get loginUser from context

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username')?.toString().trim();
        const password = formData.get('password')?.toString();

        if (!username || !password) {
            setMessage('Please fill in all fields.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            let result = {}; // Initialize result object
            try {
                // Attempt to parse JSON regardless of response.ok, as error responses might contain details
                result = await response.json();
            } catch (jsonError) {
                // Handle cases where the response body isn't valid JSON
                console.error("Failed to parse JSON response:", jsonError);
                if (!response.ok) {
                    // If response status indicates error and JSON parsing failed, show generic error
                    setMessage(`Login failed with status: ${response.status}. Please try again.`);
                    setIsLoading(false);
                    return; // Stop processing
                }
                // If response was OK but not JSON (very unlikely for a login API), treat as missing data below.
            }

            if (response.ok) {
                // --- Logic Change Starts Here ---
                // Check if the successful response ALSO contains the expected username
                if (result.user?.username) {
                    // SUCCESS CASE: Response is OK and username confirmed by API
                    console.log('Login successful via API for user:', result.user.username);
                    setMessage(result.message || "Login successful!");

                    // 3. Call loginUser ONLY when API confirms the user via username.
                    // The context's loginUser function will handle setting the state to "Ram".
                    loginUser(result.user.username);

                    router.push('/'); // Redirect on successful login and context update
                } else {
                    // EDGE CASE / ERROR: Response status is OK, but required user data is missing.
                    // Do NOT log the user in.
                    console.error('API Login response OK, but user data missing.');
                    setMessage('Login successful, but user details could not be retrieved. Please contact support.');
                    // No call to loginUser() here
                    // No redirect here
                }
                // --- Logic Change Ends Here ---
            } else {
                // FAILURE CASE: Response status indicates failure (e.g., 401, 404, 500)
                console.error('API Login failed:', result.message || `Status ${response.status}`);
                // Use message from API if available, otherwise provide a default
                setMessage(result.message || 'Login failed. Please check your username and password.');
                // No call to loginUser() here
                // No redirect here
            }
        } catch (error) {
            // NETWORK/UNEXPECTED ERROR CASE
            console.error('Network or unexpected error during login:', error);
            setMessage('Login failed. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

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
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input type="text" id="username" name="username" required disabled={isLoading} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50 disabled:bg-gray-200" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" id="password" name="password" required disabled={isLoading} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50 disabled:bg-gray-200" />
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
                {/* Message Area */}
                {message && !isLoading && (
                   <p className={`text-sm text-center ${messageColor} mt-4`}>{message}</p>
               )}
               {/* Link to Register */}
               <p className="mt-4 text-center text-sm text-gray-600">
                   Don't have an account?{' '}
                   <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">Register here</a>
               </p>
            </div>
        </div>
    );
}