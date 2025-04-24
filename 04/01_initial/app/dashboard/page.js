// app/dashboard/page.js
import { FiTrendingUp, FiTrendingDown, FiZap } from 'react-icons/fi';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import Stock from '../components/dashboard/Stock';

// Sample Data for Market Dashboard (from previous step)
const marketData = {
  topPerformers: [ { name: 'RELIANCE', change: 3.12 }, { name: 'HDFCBANK', change: 2.55 }, { name: "Tata", change: 3} ],
  topLosers: [ { name: 'ICICIBANK', change: -2.89 }, { name: 'KOTAKBANK', change: -2.15 }, {name: 'Adani', change: -2.3} ],
  topMovers: [ { name: 'ITC', change: 0.85 }, { name: 'AXISBANK', change: -1.10 }, {name: "HAL", change: 0.97} ]
};

// Sample Data for Popular Stocks (Add this or import)
const popularStocksData = [
  { name: 'RELIANCE', price: 2950.75, changePercent: 1.55, description: 'Energy, Retail, Telecom conglomerate.' },
  { name: 'TCS', price: 3890.10, changePercent: -0.39, description: 'Leading IT services & consulting company.' },
  { name: 'HDFCBANK', price: 1480.50, changePercent: 1.57, description: 'Largest private sector bank in India.' },
  { name: 'INFY', price: 1455.00, changePercent: 1.28, description: 'Global leader in next-gen digital services.' },
  { name: 'ICICIBANK', price: 1075.25, changePercent: -0.91, description: 'Major private sector bank.' },
  { name: 'BHARTIARTL', price: 1210.60, changePercent: 0.45, description: 'Leading global telecommunications company.' }
];

// app/dashboard/page.js
// ... (imports and data remain the same)

export default function DashboardPage() {
  return (
    <>
      <Header />
      {/* Market Dashboard Section */}
      <section className='bg-gray-100 p-6 md:p-10 flex flex-col gap-12 md:gap-16'> {/* Slightly lighter bg, adjusted padding/gap */}
        {/* Market Overview (Top Performers/Losers/Movers) */}
        <div>
          <h1 className='text-2xl font-semibold text-gray-800 mb-4'>Market Overview</h1>
          {/* Use grid for better alignment, especially on larger screens */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
            {/* Top Performers Card */}
            <div className='bg-white p-4 rounded-lg shadow'>
              <h2 className='text-lg font-semibold text-gray-700 mb-3 border-b pb-2'>
                <FiTrendingUp className="inline mr-2 text-green-500" /> Top Performers
              </h2>
              <ul>
                {marketData.topPerformers.map((stock, index) => (
                  <li key={index} className='flex justify-between items-center py-1 text-sm'>
                    <span className='font-medium text-gray-700'>{stock.name}</span>
                    <span className='font-semibold text-green-600'>+{stock.change.toFixed(2)}%</span> {/* Added + and % */}
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Losers Card */}
            <div className='bg-white p-4 rounded-lg shadow'>
              <h2 className='text-lg font-semibold text-gray-700 mb-3 border-b pb-2'>
                 <FiTrendingDown className="inline mr-2 text-red-500" /> Top Losers
              </h2>
              <ul>
                {marketData.topLosers.map((stock, index) => (
                  <li key={index} className='flex justify-between items-center py-1 text-sm'>
                    <span className='font-medium text-gray-700'>{stock.name}</span>
                    <span className='font-semibold text-red-600'>{stock.change.toFixed(2)}%</span> {/* Added % */}
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
                {marketData.topMovers.map((stock, index) => (
                  <li key={index} className='flex justify-between items-center py-1 text-sm'>
                    <span className='font-medium text-gray-700'>{stock.name}</span>
                    <span className={`font-semibold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}% {/* Added conditional +, % */}
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
          {/* Added flex-wrap here and adjusted gap */}
          <div className='flex flex-wrap gap-6 justify-center md:justify-start'>
            {popularStocksData.map((stock, index) => (
              // Ensure unique key for list items
              <Stock key={index} stock={stock} />
            ))}
          </div>
          {/* Removed empty inner div */}
        </div>
      </section>
      <Footer />
    </>
  );
}