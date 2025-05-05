// app/portfolio/page.js
'use client'; // Required for using hooks like useAuth

import React from 'react';
import Link from 'next/link'; // For linking to login page
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import Header from '../components/homepage/Header'; // Assuming you have these
import Footer from '../components/homepage/Footer'; // Assuming you have these

// Sample Static Data for Portfolio
const portfolioData = [
  { name: 'RELIANCE', quantity: 10, avgPrice: 2800.50, currentPrice: 2950.75 },
  { name: 'TCS', quantity: 5, avgPrice: 3950.00, currentPrice: 3890.10 },
  { name: 'HDFCBANK', quantity: 20, avgPrice: 1450.80, currentPrice: 1480.50 },
  { name: 'INFY', quantity: 15, avgPrice: 1400.00, currentPrice: 1455.00 },
];

export default function PortfolioPage() {
  const { user } = useAuth(); // Get user state from context

  // If user is not logged in, show a message
  if (!user) {
    return (
      <>
        <Header />
        <section className='bg-gray-100 p-10 min-h-screen flex flex-col items-center justify-center'>
            <div className='text-center bg-white p-8 rounded-lg shadow-md'>
                <h1 className='text-2xl font-semibold text-red-600 mb-4'>Access Denied</h1>
                <p className='text-gray-700 mb-6'>You must be logged in to view your portfolio.</p>
                <Link href="/login" legacyBehavior>
                     <a className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200'>
                         Go to Login
                     </a>
                </Link>
                {/* Add Link to Login Page */}
                {/* <Link href="/login"><a>Login Here</a></Link> */}
            </div>
        </section>
        <Footer />
      </>
    );
  }

  // Calculate derived values for the table
  const portfolioWithCalculations = portfolioData.map(holding => {
    const investmentValue = holding.quantity * holding.avgPrice;
    const currentValue = holding.quantity * holding.currentPrice;
    const gainLoss = currentValue - investmentValue;
    const gainLossPercent = (gainLoss / investmentValue) * 100;
    return {
      ...holding,
      investmentValue,
      currentValue,
      gainLoss,
      gainLossPercent,
    };
  });

  // Calculate Totals
  const totalInvestment = portfolioWithCalculations.reduce((sum, h) => sum + h.investmentValue, 0);
  const totalCurrentValue = portfolioWithCalculations.reduce((sum, h) => sum + h.currentValue, 0);
  const totalGainLoss = totalCurrentValue - totalInvestment;
  const totalGainLossPercent = totalInvestment === 0 ? 0 : (totalGainLoss / totalInvestment) * 100;


  // If user is logged in, show the portfolio content
  return (
    <>
      <Header />
      <section className='bg-gray-100 p-6 md:p-10 min-h-screen'>
        <h1 className='text-3xl font-semibold text-gray-800 mb-6'>My Portfolio</h1>

        {portfolioWithCalculations.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            {/* Portfolio Table */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Price</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Gain/Loss</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Gain/Loss (%)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {portfolioWithCalculations.map((holding, index) => {
                  const gainLossColor = holding.gainLoss >= 0 ? 'text-green-600' : 'text-red-600';
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{holding.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{holding.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">₹{holding.avgPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">₹{holding.currentPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">₹{holding.investmentValue.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">₹{holding.currentValue.toFixed(2)}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${gainLossColor}`}>
                        {holding.gainLoss >= 0 ? '+' : ''}₹{holding.gainLoss.toFixed(2)}
                      </td>
                       <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${gainLossColor}`}>
                        {holding.gainLoss >= 0 ? '+' : ''}{holding.gainLossPercent.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
               {/* Footer Row for Totals */}
              <tfoot className="bg-gray-100">
                  <tr>
                      <td colSpan="6" className="px-6 py-3 text-right text-sm font-bold text-gray-700 uppercase">Total</td>
                      <td className={`px-6 py-3 whitespace-nowrap text-sm font-bold text-right ${totalGainLoss >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                          {totalGainLoss >= 0 ? '+' : ''}₹{totalGainLoss.toFixed(2)}
                      </td>
                      <td className={`px-6 py-3 whitespace-nowrap text-sm font-bold text-right ${totalGainLossPercent >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                           {totalGainLossPercent >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%
                      </td>
                  </tr>
                   <tr>
                        <td colSpan="4" className="px-6 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total Investment</td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm font-semibold text-gray-700 text-right">₹{totalInvestment.toFixed(2)}</td>
                        <td colSpan="1" className="px-6 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total Value</td>
                        <td colSpan="2" className="px-6 py-2 whitespace-nowrap text-sm font-semibold text-gray-700 text-right">₹{totalCurrentValue.toFixed(2)}</td>

                    </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className='text-center text-gray-500 mt-10'>
            Your portfolio is empty. Start investing!
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}