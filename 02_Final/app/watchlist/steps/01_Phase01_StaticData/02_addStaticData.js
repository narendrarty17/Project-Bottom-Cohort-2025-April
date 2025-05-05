// app/watchlist/02_WatchlistPage.js
'use client';

import React from 'react';

// Sample Static Data for Watchlist - Defined within the component for now
const watchlistData = [
  { name: 'NIFTYBEES', price: 245.50, changePercent: 0.85, description: 'Nifty 50 Index ETF.' },
  { name: 'SBIN', price: 750.20, changePercent: -1.15, description: 'Largest public sector bank.' },
  { name: 'TATAMOTORS', price: 980.75, changePercent: 2.30, description: 'Major automotive manufacturer.' },
];


export default function WatchlistPage() {
  return (
    <div className="p-4">
      <h1>Watchlist Page (With Data)</h1>
      <p>We have defined the watchlist data in the code, but we are not displaying it yet.</p>
      {/* We will display the data in later steps */}
    </div>
  );
}