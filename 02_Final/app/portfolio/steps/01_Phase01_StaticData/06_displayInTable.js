// app/portfolio/06_PortfolioPage.js
'use client';

import React from 'react';
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
  const { user } = useAuth();

  return (
    <>
      <Header />

      <main className="p-6">
        <h1 className="text-xl mb-4">My Portfolio (Table Structure)</h1>

        {/* Basic Table Structure */}
        {/* overflow-x-auto makes table scroll horizontally on small screens */}
        <div className="overflow-x-auto">
            <table className="min-w-full border border-collapse"> {/* Ensure table takes full width and has borders */}
              <thead>
                {/* Add basic border and padding to header cells */}
                <tr className="border">
                  <th className="border p-2 text-left">Stock</th> {/* Align text left */}
                  <th className="border p-2 text-right">Quantity</th> {/* Align text right */}
                  <th className="border p-2 text-right">Avg. Price</th>
                  <th className="border p-2 text-right">Current Price</th>
                  <th className="border p-2 text-right">Current Value</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.map((holding, index) => {
                  const currentValue = holding.quantity * holding.currentPrice;

                  return (
                    // Add basic border to rows
                    <tr key={index} className="border">
                      {/* Add basic border and padding to data cells */}
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