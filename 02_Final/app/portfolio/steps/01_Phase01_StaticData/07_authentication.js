// app/portfolio/07_PortfolioPage.js
'use client';

import React from 'react';
import Link from 'next/link'; // Import Link
import { useAuth } from '../context/AuthContext';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';

// Sample Static Data
const portfolioData = [
  { name: 'RELIANCE', quantity: 10, avgPrice: 2800.50, currentPrice: 2950.75 },
  { name: 'TCS', quantity: 5, avgPrice: 3950.00, currentPrice: 3890.10 },
  { name: 'HDFCBANK', quantity: 20, avgPrice: 1450.80, currentPrice: 1480.50 },
];

export default function PortfolioPage() {
  const { user } = useAuth(); // Get user state

  // ---- Authentication Check ----
  if (!user) {
    // Return JSX for logged-out users
    return (
      <>
        <Header />
        <div className="p-10 text-center min-h-screen"> {/* Centering & padding */}
          <h1 className="text-red-600 text-xl mb-2">Access Denied</h1>
          <p className="mb-4">Please log in to view your portfolio.</p>
          <Link href="/login" legacyBehavior>
             <a className='text-blue-600 underline'>Go to Login</a>
          </Link>
        </div>
        <Footer />
      </>
    );
  } // End of authentication check

  // ---- Logged-in User View ----
  // Render the portfolio table if the user is logged in
  return (
    <>
      <Header />

      <main className="p-6 min-h-screen"> {/* Added min-h-screen */}
        <h1 className="text-xl mb-4">My Portfolio</h1>

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
                {portfolioData.map((holding, index) => {
                  const currentValue = holding.quantity * holding.currentPrice;
                  return (
                    <tr key={index} className="border">
                      <td className="border p-2">{holding.name}</td>
                      <td className="border p-2 text-right">{holding.quantity}</td>
                      <td className="border p-2 text-right">{holding.avgPrice.toFixed(2)}</td>
                      <td className="border p-2 text-right">{holding.currentPrice.toFixed(2)}</td>
                      <td className="border p-2 text-right font-semibold">{currentValue.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
        </div>
      </main>

      <Footer />
    </>
  );
}