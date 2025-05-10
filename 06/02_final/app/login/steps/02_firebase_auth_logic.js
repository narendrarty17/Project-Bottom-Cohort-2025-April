// app/login/page.js
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

// --- Firebase Imports ---
import { auth } from '../../firebase/firebaseConfig'; // Adjust path to your firebaseConfig.js
import { signInWithEmailAndPassword } from "firebase/auth";
// --- End Firebase Imports ---

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { loginUser } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setIsLoading(true);

        // Basic validation (optional, but good practice)
        if (!email || !password) {
            setMessage('Please fill in both email and password.');
            setIsLoading(false);
            return;
        }

        try {
            // --- Firebase Authentication Logic ---
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // --- End Firebase Authentication Logic ---

            // Login successful
            console.log('Login successful via Firebase for user:', user.email, 'UID:', user.uid);
            setMessage("Login successful!"); // Set success message

            // Redirect on successful login
            router.push('/');

        } catch (error) {
            // --- Firebase Error Handling ---
            console.error('Firebase Login Error:', error.code, error.message);
            let friendlyMessage = 'Login failed. Please try again.'; // Default message
            switch (error.code) {
                case 'auth/invalid-email':
                    friendlyMessage = 'Invalid email format.';
                    break;
                case 'auth/user-not-found': // Deprecated, use 'auth/invalid-credential'
                case 'auth/wrong-password': // Deprecated, use 'auth/invalid-credential'
                case 'auth/invalid-credential':
                    friendlyMessage = 'Invalid email or password.';
                    break;
                case 'auth/user-disabled':
                    friendlyMessage = 'This user account has been disabled.';
                    break;
                // Add more specific cases as needed
                default:
                    friendlyMessage = `Login failed: ${error.message}`; // More specific if possible
            }
            setMessage(friendlyMessage);
            // --- End Firebase Error Handling ---

        } finally {
            setIsLoading(false);
        }
    };

    // Determine message color (remains the same)
    const messageIsError = message.toLowerCase().includes('fail') || message.toLowerCase().includes('invalid') || message.toLowerCase().includes('error') || message.toLowerCase().includes('fill');
    const messageColor = messageIsError ? 'text-red-600' : 'text-green-600';

    // --- Update JSX Form ---
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-900">
                    Log in to your account
                </h1>
                {/* Change to controlled components for easier state management */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email" // Change type to email
                            id="email"
                            name="email"
                            value={email} // Controlled input
                            onChange={(e) => setEmail(e.target.value)} // Update state on change
                            required
                            disabled={isLoading}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50 disabled:bg-gray-200"
                            placeholder="you@example.com"
                         />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password} // Controlled input
                            onChange={(e) => setPassword(e.target.value)} // Update state on change
                            required
                            disabled={isLoading}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-50 disabled:bg-gray-200" />
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
                   {/* Make sure you have a registration page setup with Firebase */}
                   <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">Register here</a>
               </p>
            </div>
        </div>
    );
}