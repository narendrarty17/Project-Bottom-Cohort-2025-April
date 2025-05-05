// app/portfolio/08_PortfolioPage.js
'use client';

import React, { useState, useEffect } from 'react'; // Import hooks
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
// Removed static portfolioData

export default function PortfolioPage() {
  const { user } = useAuth();

  // --- State Variables ---
  const [portfolio, setPortfolio] = useState([]); // Holds raw portfolio data from API
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect for fetching will be added next

  // ---- Authentication Check ----
  if (!user) {
    // ... (Access Denied JSX remains the same)
     return (
       <>
         <Header />
         <div className="p-10 text-center min-h-screen">
           <h1 className="text-red-600 text-xl mb-2">Access Denied</h1>
           <p className="mb-4">Please log in to view your portfolio.</p>
           <Link href="/login" legacyBehavior><a className='text-blue-600 underline'>Go to Login</a></Link>
         </div>
         <Footer />
       </>
     );
  }

  // --- Derived Data Calculation ---
  // Calculate portfolio with values ONLY if not loading and no error
  // Note: This calculation runs on every render where portfolio data is available
  const portfolioWithCalculations = (!isLoading && !error && portfolio.length > 0)
    ? portfolio.map(holding => {
        const currentValue = holding.quantity * holding.currentPrice;
        // Add more calculations later if needed (investment, gain/loss)
        return {
          ...holding,
          currentValue,
        };
      })
    : []; // Return empty array otherwise

  // ---- Logged-in User View ----
  return (
    <>
      <Header />
      <main className="p-6 min-h-screen">
        <h1 className="text-xl mb-4">My Portfolio</h1>

        {/* --- Conditional Rendering --- */}
        {isLoading ? (
          <p>Loading portfolio...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : portfolio.length === 0 ? ( // Check original portfolio state for emptiness
          <p>Your portfolio is empty.</p>
        ) : (
          // Render table if loading done, no error, and data exists
          <div className="overflow-x-auto">
            <table className="min-w-full border border-collapse">
              <thead>
                <tr className="border">
                  <th className="border p-2 text-left">Stock</th>
                  <th className="border p-2 text-right">Quantity</th>
                  <th className="border p-2 text-right">Avg. Price</th>
                  <th className="border p-2 text-right">Current Price</th>
                  <th className="border p-2 text-right">Current Value</th>
                </tr>
              </thead>
              <tbody>
                {/* Map over the CALCULATED data */}
                {portfolioWithCalculations.map((holding, index) => (
                  <tr key={holding.name || index} className="border">
                    <td className="border p-2">{holding.name}</td>
                    <td className="border p-2 text-right">{holding.quantity}</td>
                    <td className="border p-2 text-right">{holding.avgPrice.toFixed(2)}</td>
                    <td className="border p-2 text-right">{holding.currentPrice.toFixed(2)}</td>
                    <td className="border p-2 text-right font-semibold">{holding.currentValue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}