// app/register/page.js
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// --- Firebase Imports ---
import { auth } from '../../firebase/firebaseConfig'; // Adjust path if needed
import { createUserWithEmailAndPassword } from "firebase/auth";
// --- End Firebase Imports ---

export default function RegisterPage() {
    // Use state for controlled inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setIsLoading(true);

        // --- Get values from state (controlled inputs) ---
        const currentEmail = email.trim();
        const currentPassword = password; // No trim for password

        // --- Client-side Validation ---
        if (!currentEmail || !currentPassword || !confirmPassword) {
            setMessage('Please fill in all fields.');
            setIsLoading(false);
            return;
        }
        if (currentPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            setIsLoading(false);
            return;
        }
        // Firebase enforces minimum password length (6 chars) by default,
        // but client-side check is still good UX.
        if (currentPassword.length < 6) {
            setMessage('Password must be at least 6 characters long.');
            setIsLoading(false);
            return;
        }
        // Basic email format check (optional, Firebase validates more thoroughly)
        if (!/\S+@\S+\.\S+/.test(currentEmail)) {
             setMessage('Please enter a valid email address.');
             setIsLoading(false);
             return;
        }
        // --- End Validation ---

        try {
            // --- Firebase Registration Logic ---
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                currentEmail,
                currentPassword
            );
            const newUser = userCredential.user;
            // --- End Firebase Registration Logic ---

            console.log('Registration successful via Firebase for user:', newUser.uid, newUser.email);
            setMessage('Registration successful! Please log in.');

            // Optionally reset form fields using state setters
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            // Redirect to login page after a short delay (optional)
            setTimeout(() => {
                router.push('/login');
            }, 1500); // Redirect after 1.5 seconds

        } catch (error) {
            // --- Firebase Error Handling ---
            console.error('Firebase Registration Error:', error.code, error.message);
            let friendlyMessage = 'Registration failed. Please try again.'; // Default
            switch (error.code) {
                case 'auth/email-already-in-use':
                    friendlyMessage = 'This email address is already registered.';
                    break;
                case 'auth/invalid-email':
                    friendlyMessage = 'Please enter a valid email address.';
                    break;
                case 'auth/weak-password':
                    friendlyMessage = 'Password is too weak. It must be at least 6 characters long.';
                    break;
                // Add more specific cases if needed
                default:
                    friendlyMessage = `Registration failed: ${error.message}`;
            }
            setMessage(friendlyMessage);
            // --- End Firebase Error Handling ---
        } finally {
            setIsLoading(false);
        }
    };

    // Determine message color based on content
    const messageIsSuccess = message.toLowerCase().includes('successful');
    const messageColor = messageIsSuccess ? 'text-green-600' : 'text-red-600';

    // --- Update JSX Form Inputs ---
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-900">
                    Create your account
                </h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email Field (Changed from Username) */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email Address
                        </label>
                        <input
                            type="email" // Change type to email
                            id="email"
                            name="email"
                            value={email} // Controlled input
                            onChange={(e) => setEmail(e.target.value)} // Update state
                            required
                            disabled={isLoading}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50 disabled:bg-gray-200"
                            placeholder="you@example.com"
                         />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password (min. 6 characters)
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password} // Controlled input
                            onChange={(e) => setPassword(e.target.value)} // Update state
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
                            value={confirmPassword} // Controlled input
                            onChange={(e) => setConfirmPassword(e.target.value)} // Update state
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