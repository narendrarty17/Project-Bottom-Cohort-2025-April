// app/portfolio/03_PortfolioPage.js
'use client';

import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import the hook
import Header from '../components/homepage/Header'; // Import Header
import Footer from '../components/homepage/Footer'; // Import Footer

// Sample Static Data
const portfolioData = [
  { name: 'RELIANCE', quantity: 10, avgPrice: 2800.50, currentPrice: 2950.75 },
  { name: 'TCS', quantity: 5, avgPrice: 3950.00, currentPrice: 3890.10 },
  { name: 'HDFCBANK', quantity: 20, avgPrice: 1450.80, currentPrice: 1480.50 },
];

export default function PortfolioPage() {
  // Get user from context - we'll use this for authentication later
  const { user } = useAuth();

  // Get the first item from the data for manual display
  const firstHolding = portfolioData[0];

  return (
    <>
      <Header />

      {/* Main content area with padding */}
      <main className="p-6"> {/* Added padding */}
        <h1 className="text-xl mb-4">My Portfolio (Layout + Single Item Display)</h1> {/* Basic heading style */}

        <p className="mb-4">Below is the raw data for the first stock holding:</p>

        {/* Manually display data for the first holding using simple <p> tags */}
        {/* Add a simple border and padding for visual separation */}
        <div className="border p-3">
            <p>Stock: {firstHolding.name}</p>
            <p>Quantity: {firstHolding.quantity}</p>
            <p>Average Price: {firstHolding.avgPrice}</p>
            <p>Current Price: {firstHolding.currentPrice}</p>
        </div>

      </main>

      <Footer />
    </>
  );
}