// app/dashboard/page.js
import { FiTrendingUp, FiTrendingDown, FiZap } from 'react-icons/fi';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';

// Sample Data for Market Dashboard (from previous step)
const marketData = {
  topPerformers: [ { name: 'RELIANCE', change: 3.12 }, { name: 'HDFCBANK', change: 2.55 }, /* ... */ ],
  topLosers: [ { name: 'ICICIBANK', change: -2.89 }, { name: 'KOTAKBANK', change: -2.15 }, /* ... */ ],
  topMovers: [ { name: 'ITC', change: 0.85 }, { name: 'AXISBANK', change: -1.10 }, /* ... */ ]
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

export default function DashboardPage() {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}