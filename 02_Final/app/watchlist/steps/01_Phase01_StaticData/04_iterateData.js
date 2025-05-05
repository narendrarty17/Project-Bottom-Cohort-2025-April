// app/watchlist/04_WatchlistPage.js
'use client';

import React from 'react';
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
  const { user } = useAuth();

  return (
    <>
      <Header />

      <main className="p-6">
        <h1 className="text-xl mb-4">My Watchlist (Iterating Data)</h1>

        {/* Container for the list of stocks */}
        {/* We use space-y-4 to add vertical space between child elements (the Stock cards) */}
        <div className="space-y-4">
          {/*
            Use the JavaScript .map() function to loop over watchlistData.
            For each 'stockItem' in the array, we render a <Stock> component.
            'key={index}' is important for React to efficiently update the list.
            'stock={stockItem}' passes the current item's data to the Stock component.
          */}
          {watchlistData.map((stockItem, index) => (
            <Stock key={index} stock={stockItem} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}