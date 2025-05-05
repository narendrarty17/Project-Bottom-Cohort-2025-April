// app/watchlist/07_WatchlistPage.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios'; // Import axios
import { useAuth } from '../context/AuthContext';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import Stock from '../components/dashboard/Stock';

export default function WatchlistPage() {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- useEffect Hook for Data Fetching ---
  useEffect(() => {
    // Only fetch data if the user is logged in
    if (user) {
      const fetchWatchlist = async () => {
        setIsLoading(true); // Start loading
        setError(null); // Reset error state

        try {
          const response = await axios.get('/api/watchlist');

          if (response.data && Array.isArray(response.data.watchlist)) {
            setWatchlist(response.data.watchlist); // Update state with fetched data
          } else {
             console.warn("API response missing watchlist array:");
             setWatchlist([]); // Set to empty array
          }
        } catch (err) {
          setError(`Failed to fetch watchlist.`);
          setWatchlist([]); // Clear any potentially stale data
        } finally {
          setIsLoading(false); // Stop loading indicator
        }
      };

      fetchWatchlist(); // Call the async function
    } else {
      setWatchlist([]);
      setIsLoading(false);
      setError(null);
    }
  }, [user]);

  // ---- Authentication Check ----
  if (!user) {
    // ... (Access Denied JSX remains the same)
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
  // (Conditional rendering JSX remains the same as Step 6)
  return (
    <>
      <Header />
      <main className="p-6 min-h-screen">
        <h1 className="text-xl mb-4">My Watchlist</h1>
        {isLoading ? (
          <p>Loading watchlist...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : watchlist.length === 0 ? (
          <p>Your watchlist is empty.</p>
        ) : (
          <div className="space-y-4">
            {watchlist.map((stockItem, index) => (
              <Stock key={stockItem.name || index} stock={stockItem} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}