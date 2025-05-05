// app/portfolio/02_PortfolioPage.js
'use client';

import React from 'react';

// Sample Static Data for Portfolio
const portfolioData = [
  { name: 'RELIANCE', quantity: 10, avgPrice: 2800.50, currentPrice: 2950.75 },
  { name: 'TCS', quantity: 5, avgPrice: 3950.00, currentPrice: 3890.10 },
  { name: 'HDFCBANK', quantity: 20, avgPrice: 1450.80, currentPrice: 1480.50 },
];

export default function PortfolioPage() {
  return (
    <div className="p-4">
      <h1>Portfolio Page (With Data)</h1>
      <p>We have defined the portfolio data in the code, but we are not displaying it yet.</p>
      {/* We will display the data in later steps */}
    </div>
  );
}