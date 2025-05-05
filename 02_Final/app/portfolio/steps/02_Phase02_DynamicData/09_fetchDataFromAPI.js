// app/portfolio/09_PortfolioPage.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios'; // Import axios
import { useAuth } from '../context/AuthContext';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';

export default function PortfolioPage() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState([]); // Raw data
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- useEffect Hook for Data Fetching ---
  useEffect(() => {
    if (user) {
      const fetchPortfolio = async () => {
        setIsLoading(true);
        setError(null);
        try {
          // Fetch data from the portfolio API endpoint
          const response = await axios.get('/api/portfolio');

          // Check response data structure
          if (response.data && Array.isArray(response.data.portfolio)) {
            setPortfolio(response.data.portfolio); // Set raw data
          } else {
            console.warn("API response missing portfolio array:");
            setPortfolio([]);
            // Optionally set error
          }
        } catch (err) {
          console.error("Error fetching portfolio:", err);
          setError(`Failed to fetch portfolio.`);
          setPortfolio([]); // Clear data on error
        } finally {
          setIsLoading(false); // Stop loading
        }
      };
      fetchPortfolio();
    } else {
      // Clear data if user logs out
      setPortfolio([]);
      setIsLoading(false);
      setError(null);
    }
  }, [user]); // Re-run if user changes


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
  // Calculate portfolio with values based on the 'portfolio' state
   const portfolioWithCalculations = (!isLoading && !error && portfolio.length > 0)
    ? portfolio.map(holding => {
        const currentValue = holding.quantity * holding.currentPrice;
        return {
          ...holding,
          currentValue,
        };
      })
    : [];

  return (
    <>
      <Header />
      <main className="p-6 min-h-screen">
        <h1 className="text-xl mb-4">My Portfolio</h1>
        {isLoading ? (
          <p>Loading portfolio...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : portfolio.length === 0 ? (
           <p>Your portfolio is empty.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-collapse">
              <thead>
                <tr className="border">
                  <th className="border p-2 text-left">Stock</th>
                  <th className="border p-2 text-right">Quantity</th>
                  <th className="border p-2 text-right">Avg. Price</th>
                  <th className="border p-2 text-right">Current Price</th>
                  <th className="border p-2 text-right">Current Value</th>
                  {/* Add more headers if calculating gain/loss */}
                </tr>
              </thead>
              <tbody>
                {portfolioWithCalculations.map((holding, index) => (
                  <tr key={holding.name || index} className="border">
                    <td className="border p-2">{holding.name}</td>
                    <td className="border p-2 text-right">{holding.quantity}</td>
                    <td className="border p-2 text-right">{(holding.avgPrice || 0).toFixed(2)}</td>
                    <td className="border p-2 text-right">{(holding.currentPrice || 0).toFixed(2)}</td>
                    <td className="border p-2 text-right font-semibold">{holding.currentValue.toFixed(2)}</td>
                    {/* Add more cells if calculating gain/loss */}
                  </tr>
                ))}
              </tbody>
               {/* Optional: Add tfoot for totals later */}
            </table>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}