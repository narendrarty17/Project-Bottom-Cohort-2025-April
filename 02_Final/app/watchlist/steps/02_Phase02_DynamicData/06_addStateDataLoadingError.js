// app/watchlist/06_WatchlistPage.js
'use client';

import React, { useState, useEffect } from 'react'; // Import hooks
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import Stock from '../components/dashboard/Stock';
// Removed the static watchlistData import/definition

export default function WatchlistPage() {
  const { user } = useAuth();

  // --- State Variables ---
  const [watchlist, setWatchlist] = useState([]); // To hold data from API
  const [isLoading, setIsLoading] = useState(true); // To show loading indicator
  const [error, setError] = useState(null); // To show error messages

  // useEffect will be added in the next step to fetch data

  // ---- Authentication Check ----
  if (!user) {
    // ... (Access Denied JSX remains the same as Step 5)
    return (
      <>
        <Header />
        <div className="p-10 text-center min-h-screen">
          <h1 className="text-red-600 text-xl mb-2">Access Denied</h1>
          <p className="mb-4">Please log in to view your watchlist.</p>
          <Link href="/login" legacyBehavior><a className='text-blue-600 underline'>Go to Login</a></Link>
        </div>
        <Footer />
      </>
    );
  }

  // ---- Logged-in User View ----
  return (
    <>
      <Header />
      <main className="p-6 min-h-screen">
        <h1 className="text-xl mb-4">My Watchlist</h1>

        {/* --- Conditional Rendering based on state --- */}
        {isLoading ? (
          <p>Loading watchlist...</p> // Show loading message
        ) : error ? (
          <p className="text-red-600">Error: {error}</p> // Show error message
        ) : watchlist.length === 0 ? (
          <p>Your watchlist is empty.</p> // Show empty message
        ) : (
          // Only render the list if loading is done, no error, and list is not empty
          <div className="space-y-4">
            {/* Map over the 'watchlist' state variable */}
            {watchlist.map((stockItem, index) => (
              <Stock key={stockItem.name || index} stock={stockItem} /> // Use unique ID if available, else index
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}