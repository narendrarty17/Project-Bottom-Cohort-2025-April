// app/watchlist/03_WatchlistPage.js
'use client';

import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import the hook to access context
import Header from '../components/homepage/Header'; // Import Header
import Footer from '../components/homepage/Footer'; // Import Footer
import Stock from '../components/dashboard/Stock';   // Import Stock component

// Sample Static Data
const watchlistData = [
  { name: 'NIFTYBEES', price: 245.50, changePercent: 0.85, description: 'Nifty 50 Index ETF.' },
  { name: 'SBIN', price: 750.20, changePercent: -1.15, description: 'Largest public sector bank.' },
  { name: 'TATAMOTORS', price: 980.75, changePercent: 2.30, description: 'Major automotive manufacturer.' },
];

export default function WatchlistPage() {
  // Get user from context - we'll use this for authentication later
  const { user } = useAuth();

  return (
    // Use React Fragment <>...</> to return multiple elements without a wrapper div
    <>
      <Header />

      {/* Main content area with padding */}
      <main className="p-6"> {/* Added padding */}
        <h1 className="text-xl mb-4">My Watchlist (Layout + Single Stock)</h1> {/* Basic heading style */}

        <p className="mb-4">Below is one stock from our data, displayed using the Stock component:</p>

        {/*
          Manually render the FIRST stock from the array.
          We pass the first item (watchlistData[0]) as the 'stock' prop
          to the Stock component we created earlier.
        */}
        <Stock stock={watchlistData[0]} />

      </main>

      <Footer />
    </>
  );
}