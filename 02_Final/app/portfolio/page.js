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
          const response = await axios.get('/api/portfolio');
          if (response.data && Array.isArray(response.data.portfolio)) {
            setPortfolio(response.data.portfolio);
          } else {
            console.warn("API response missing portfolio array:", response.data);
            setPortfolio([]);
            // setError("Received invalid data format from server."); // Optional: More specific error
          }
        } catch (err) {
          console.error("Error fetching portfolio:", err);
          // Improve error message detail if possible
          const message = err.response?.data?.message || err.message || "Failed to fetch portfolio.";
          setError(`Failed to fetch portfolio: ${message}`);
          setPortfolio([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPortfolio();
    } else {
      setPortfolio([]);
      setIsLoading(false);
      setError(null); // Clear error when user logs out
    }
  }, [user]); // Re-run if user changes


  // ---- Authentication Check ----
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* Centered content for access denied */}
        <main className="flex-grow flex flex-col items-center justify-center p-6 bg-gray-50">
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
            <h1 className="text-2xl font-semibold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-700 mb-6">Please log in to view your portfolio.</p>
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

  // --- Derived Data Calculation ---
  const portfolioWithCalculations = (!isLoading && !error && portfolio.length > 0)
    ? portfolio.map(holding => {
        const currentValue = (holding.quantity || 0) * (holding.currentPrice || 0);
        return {
          ...holding,
          // Ensure defaults for potentially missing data
          quantity: holding.quantity || 0,
          avgPrice: holding.avgPrice || 0,
          currentPrice: holding.currentPrice || 0,
          name: holding.name || 'N/A', // Provide a default name
          currentValue,
        };
      })
    : [];

  // --- Optional: Calculate Totals ---
  const totalPortfolioValue = portfolioWithCalculations.reduce(
    (sum, holding) => sum + holding.currentValue,
    0
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 md:mb-8">My Portfolio</h1>

        {isLoading ? (
          <div className="text-center py-10">
             {/* Optional: Add a spinner component here */}
            <p className="text-lg text-gray-600">Loading portfolio...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative text-center" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : portfolio.length === 0 ? (
           <div className="bg-white p-6 rounded-lg shadow-md text-center">
             <p className="text-lg text-gray-700">Your portfolio is currently empty.</p>
             {/* Optional: Add a link/button to guide users */}
             {/* <Link href="/stocks" legacyBehavior><a className='mt-4 inline-block px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600'>Find Stocks to Add</a></Link> */}
           </div>
        ) : (
          // Use a card-like container for the table for better visual separation
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Responsive table container */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                {/* Table Header */}
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg. Purchase Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Value
                    </th>
                    {/* Potential future columns: Gain/Loss %, Total Gain/Loss $ */}
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {portfolioWithCalculations.map((holding, index) => (
                    <tr key={holding.symbol || holding.name || index} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                      {/* Stock Name */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{holding.name}</div>
                        {holding.symbol && <div className="text-xs text-gray-500">{holding.symbol}</div>} {/* Display symbol if available */}
                      </td>
                      {/* Quantity */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700">
                        {holding.quantity}
                      </td>
                      {/* Average Price */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700">
                        ${holding.avgPrice.toFixed(2)}
                      </td>
                      {/* Current Price */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700">
                        ${holding.currentPrice.toFixed(2)}
                      </td>
                      {/* Current Value */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900">
                        ${holding.currentValue.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                 {/* Optional Table Footer for Totals */}
                <tfoot className="bg-gray-100">
                    <tr>
                        <td colSpan="4" className="px-6 py-3 text-right text-sm font-medium text-gray-700 uppercase tracking-wider">
                            Total Portfolio Value
                        </td>
                        <td className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                            ${totalPortfolioValue.toFixed(2)}
                        </td>
                    </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}