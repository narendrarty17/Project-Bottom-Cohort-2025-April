// app/watchlist/07_WatchlistPage.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios'; // Import axios
import { useAuth } from '../context/AuthContext';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import Stock from '../components/dashboard/Stock'; // Assuming this component displays a single watchlist item

export default function WatchlistPage() {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- useEffect Hook for Data Fetching ---
  useEffect(() => {
    if (user) {
      const fetchWatchlist = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.get('/api/watchlist');
          if (response.data && Array.isArray(response.data.watchlist)) {
            setWatchlist(response.data.watchlist);
          } else {
            console.warn("API response missing watchlist array:", response.data);
            setWatchlist([]);
            // Optionally set an error if the format is unexpected but the request succeeded
            // setError("Received invalid data format from server.");
          }
        } catch (err) {
          console.error("Error fetching watchlist:", err);
          // Improve error message detail if possible
          const message = err.response?.data?.message || err.message || "Failed to fetch watchlist.";
          setError(`Failed to fetch watchlist: ${message}`);
          setWatchlist([]); // Clear data on error
        } finally {
          setIsLoading(false);
        }
      };
      fetchWatchlist();
    } else {
      // Clear state if user logs out or was never logged in
      setWatchlist([]);
      setIsLoading(false);
      setError(null);
    }
  }, [user]); // Dependency array includes user

  // ---- Authentication Check ----
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* Centered content for access denied */}
        <main className="flex-grow flex flex-col items-center justify-center p-6 bg-gray-50">
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
            <h1 className="text-2xl font-semibold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-700 mb-6">Please log in to view your watchlist.</p>
            <Link href="/login" legacyBehavior>
              <a className='inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200'>
                Go to Login
              </a>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ---- Logged-in User View ----
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 md:mb-8">My Watchlist</h1>

        {isLoading ? (
          <div className="text-center py-10">
             {/* Optional: Add a spinner component here */}
             {/* e.g., <Spinner className="mx-auto h-8 w-8 text-blue-600" /> */}
            <p className="text-lg text-gray-600 mt-4">Loading watchlist...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative text-center max-w-2xl mx-auto" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : watchlist.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-lg mx-auto">
             <p className="text-lg text-gray-700 mb-4">Your watchlist is currently empty.</p>
             <Link href="/dashboard"> {/* Or link to a page where they can search/add stocks */}
                <div className='inline-block px-5 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition duration-200'>
                  Find Stocks to Watch
                </div>
            </Link>
           </div>
        ) : (
          // Container for the list of Stock components
          // Adjust grid columns based on screen size for better layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {watchlist.map((stockItem, index) => (
              // Assuming the Stock component is designed as a card
              <Stock
                key={stockItem.symbol || stockItem.name || index} // Prefer symbol or unique ID if available
                stock={stockItem}
                // Pass any necessary props down to Stock, e.g., functions to remove from watchlist
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}