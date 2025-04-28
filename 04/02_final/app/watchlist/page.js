// app/watchlist/page.js
'use client'; // Required for using hooks like useAuth

import React from 'react';
import Link from 'next/link'; // For linking to login page
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import Header from '../components/homepage/Header'; // Assuming you have these
import Footer from '../components/homepage/Footer'; // Assuming you have these
// You can reuse the Stock component or create a specific WatchlistItem
import Stock from '../components/dashboard/Stock'; // Reusing the styled Stock component

// Sample Static Data for Watchlist
const watchlistData = [
  { name: 'NIFTYBEES', price: 245.50, changePercent: 0.85, description: 'Nifty 50 Index ETF.' },
  { name: 'SBIN', price: 750.20, changePercent: -1.15, description: 'Largest public sector bank.' },
  { name: 'TATAMOTORS', price: 980.75, changePercent: 2.30, description: 'Major automotive manufacturer.' },
  { name: 'WIPRO', price: 485.00, changePercent: 0.10, description: 'Global IT, consulting & BPO company.' },
];

export default function WatchlistPage() {
  const { user } = useAuth(); // Get user state from context

  // If user is not logged in, show a message
  if (!user) {
    return (
      <>
        <Header />
        <section className='bg-gray-100 p-10 min-h-screen flex flex-col items-center justify-center'>
          <div className='text-center bg-white p-8 rounded-lg shadow-md'>
            <h1 className='text-2xl font-semibold text-red-600 mb-4'>Access Denied</h1>
            <p className='text-gray-700 mb-6'>You must be logged in to view your watchlist.</p>
            <Link href="/login" legacyBehavior>
                 <a className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200'>
                     Go to Login
                 </a>
            </Link>
           {/* Add Link to Login Page if you have one */}
           {/* <Link href="/login"><a>Login Here</a></Link> */}
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // If user is logged in, show the watchlist content
  return (
    <>
      <Header />
      <section className='bg-gray-100 p-6 md:p-10 min-h-screen'>
        <h1 className='text-3xl font-semibold text-gray-800 mb-6'>My Watchlist</h1>

        {/* Display watchlist items */}
        {watchlistData.length > 0 ? (
          <div className='flex flex-wrap gap-6 justify-center md:justify-start'>
            {watchlistData.map((stock, index) => (
              // Reusing the Stock component for card display
              <Stock key={index} stock={stock} />
            ))}
          </div>
        ) : (
          <div className='text-center text-gray-500 mt-10'>
            Your watchlist is empty. Add some stocks!
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}