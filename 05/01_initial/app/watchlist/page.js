// app/watchlist/05_WatchlistPage.js
'use client';

import React from 'react';
import Link from 'next/link'; // Import Link for navigation
import { useAuth } from '../context/AuthContext';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import Stock from '../components/dashboard/Stock';

// Sample Static Data
const watchlistData = [
  { name: 'NIFTYBEES', price: 245.50, changePercent: 0.85, description: 'Nifty 50 Index ETF.' },
  { name: 'SBIN', price: 750.20, changePercent: -1.15, description: 'Largest public sector bank.' },
  { name: 'TATAMOTORS', price: 980.75, changePercent: 2.30, description: 'Major automotive manufacturer.' },
];

export default function WatchlistPage() {
  const { user } = useAuth(); // Get the user state

  // ---- Authentication Check ----
  // If the 'user' object from the context is null (or undefined),
  // it means the user is not logged in.
  if (!user) {
    // Return a different JSX structure for logged-out users
    return (
      <div className='bg-gray-200'>
        <Header />
        {/* Simple centered message area */}
        <div className="p-10 text-center min-h-screen"> {/* Basic centering & padding */}
          <h1 className="text-red-600 text-xl mb-2">Access Denied</h1> {/* Red text for emphasis */}
          <p className="mb-4 text-gray-800">Please log in to view your watchlist.</p>
          {/* Provide a link to the login page (assuming /login exists) */}
          <Link href="/login" legacyBehavior>
            <a className='text-blue-600 underline'>Go to Login</a>
          </Link>
        </div>
        <Footer />
      </ div>
    );
  } // End of the authentication check block

  // ---- Logged-in User View ----
  // If the code reaches here, it means 'user' is not null, so the user IS logged in.
  // Return the main watchlist content.
  return (
    <>
      <Header />

      <main className="p-6 min-h-screen bg-gray-200"> {/* Added min-h-screen for better layout */}
        <h1 className="text-xl mb-4">My Watchlist</h1>

        <div className="space-x-6 flex">
          {watchlistData.map((stockItem, index) => (
            <Stock key={index} stock={stockItem} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}