// app/portfolio/05_PortfolioPage.js
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
        <h1 className="text-xl mb-4">My Portfolio (With Current Value Calc)</h1>

        <div className="space-y-4">
          {portfolioData.map((holding, index) => {
            // Calculate current value inside the loop
            const currentValue = holding.quantity * holding.currentPrice;

            return (
              <div key={index} className="border p-3">
                <p>Stock: {holding.name}</p>
                <p>Quantity: {holding.quantity}</p>
                <p>Average Price: {holding.avgPrice.toFixed(2)}</p> {/* Format numbers */}
                <p>Current Price: {holding.currentPrice.toFixed(2)}</p> {/* Format numbers */}
                {/* Display the calculated current value */}
                <p className="font-semibold">Current Value: {currentValue.toFixed(2)}</p> {/* Basic bold style */}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}