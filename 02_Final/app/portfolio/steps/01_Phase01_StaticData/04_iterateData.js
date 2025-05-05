// app/portfolio/04_PortfolioPage.js
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
        <h1 className="text-xl mb-4">My Portfolio (Iterating Raw Data)</h1>

        {/* Container for the list of holdings */}
        {/* Use space-y-4 to add vertical space between holdings */}
        <div className="space-y-4">
          {/*
            Use .map() to loop over portfolioData.
            For each 'holding' in the array, render a div with its details.
            'key={index}' is important for React lists.
          */}
          {portfolioData.map((holding, index) => (
            <div key={index} className="border p-3"> {/* Simple border and padding */}
              <p>Stock: {holding.name}</p>
              <p>Quantity: {holding.quantity}</p>
              <p>Average Price: {holding.avgPrice}</p>
              <p>Current Price: {holding.currentPrice}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}