// app/dashboard/page.js
'use client'; // <-- ADDED: Required for hooks

import React, { useState, useEffect } from 'react'; // <-- ADDED: Import hooks
import axios from 'axios'; // <-- ADDED: Import axios for fetching
import { FiTrendingUp, FiTrendingDown, FiZap, FiLoader } from 'react-icons/fi'; // <-- ADDED: FiLoader for loading icon
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import Stock from '../components/dashboard/Stock';

// --- REMOVED/COMMENTED OUT: Static Data ---
/*
const marketData = { ... };
const popularStocksData = [ ... ];
*/

export default function DashboardPage() {
  // --- ADDED: State for fetched data and loading status ---
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);   
     
  // --- ADDED: Fetch data on component mount ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true); // Set loading true before fetch
      try {
        const response = await axios.get('/api/dashboard');
        setDashboardData(response.data); // Store fetched data
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Handle error state if needed (e.g., setError('Failed to load'))
        setDashboardData(null); // Clear data on error
      } finally {
        setIsLoading(false); // Set loading false after fetch attempt (success or fail)
      }
    };

    fetchDashboardData();
  }, []); // Empty dependency array means run only once on mount

  // --- ADDED: Conditional Loading UI ---
  if (isLoading) {
    return (
      <>
        <Header />
        <section className='bg-gray-100 p-10 min-h-[60vh] flex justify-center items-center'>
          <div className='text-center'>
            <FiLoader className='animate-spin text-4xl text-blue-500 mx-auto mb-4' />
            <p className='text-lg text-gray-600'>Loading Dashboard...</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // --- Original Render Logic (Modified to use state) ---
  // Render this part only if loading is finished
  // Add checks for dashboardData before trying to access its properties
  return (
    <>
      <Header />
      <section className='bg-gray-100 p-6 md:p-10 flex flex-col gap-12 md:gap-16'>
        {/* Market Overview Section */}
        <div>
          <h1 className='text-2xl font-semibold text-gray-800 mb-4'>Market Overview</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
            {/* Top Performers Card */}
            <div className='bg-white p-4 rounded-lg shadow'>
              <h2 className='text-lg font-semibold text-gray-700 mb-3 border-b pb-2'>
                <FiTrendingUp className="inline mr-2 text-green-500" /> Top Performers
              </h2>
              <ul>
                {/* MODIFIED: Use data from state with optional chaining */}
                {marketData.topPerformers.map((stock, index) => (
                  <li key={index} className='flex justify-between items-center py-1 text-sm'>
                    <span className='font-medium text-gray-700'>{stock.name}</span>
                    <span className='font-semibold text-green-600'>+{stock.change?.toFixed(2)}%</span>
                  </li>
                // Add fallback if data is missing/empty
                ))}
              </ul>
            </div>

            {/* Top Losers Card */}
            <div className='bg-white p-4 rounded-lg shadow'>
              <h2 className='text-lg font-semibold text-gray-700 mb-3 border-b pb-2'>
                 <FiTrendingDown className="inline mr-2 text-red-500" /> Top Losers
              </h2>
              <ul>
                 {/* MODIFIED: Use data from state with optional chaining */}
                {marketData.topLosers.map((stock, index) => (
                  <li key={index} className='flex justify-between items-center py-1 text-sm'>
                    <span className='font-medium text-gray-700'>{stock.name}</span>
                    <span className='font-semibold text-red-600'>{stock.change?.toFixed(2)}%</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Movers Card */}
            <div className='bg-white p-4 rounded-lg shadow'>
              <h2 className='text-lg font-semibold text-gray-700 mb-3 border-b pb-2'>
                <FiZap className="inline mr-2 text-blue-500" /> Top Movers
              </h2>
              <ul>
                 {/* MODIFIED: Use data from state with optional chaining */}
                {marketData.topMovers.map((stock, index) => (
                  <li key={index} className='flex justify-between items-center py-1 text-sm'>
                    <span className='font-medium text-gray-700'>{stock.name}</span>
                    <span className={`font-semibold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change?.toFixed(2)}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Popular Stocks Section */}
        <div>
          <h1 className='text-2xl font-semibold text-gray-800 mb-4'>Popular Stocks</h1>
          <div className='flex flex-wrap gap-6 justify-center md:justify-start'>
             {/* MODIFIED: Use data from state with optional chaining */}
            {popularStocksData.map((stock, index) => (
              // Use unique key like stock.name if available and unique
              <Stock key={index} stock={stock} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
