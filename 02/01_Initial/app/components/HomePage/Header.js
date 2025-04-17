// app/components/homepage/Header.js
'use client'; // Required for hooks

import Image from "next/image";
import Link from 'next/link';
// 1. Import the useAuth hook
import { useAuth } from '../../context/AuthContext'; // <-- Adjust path if needed

export default function Header() {
  // 2. Get user state and logout function
  const { user, logoutUser } = useAuth();
  console.log("User: ", user);

  // 3. handleLogout calls context function
  const handleLogout = () => {
    logoutUser();
    // Optional: Add redirect logic here if needed
  };

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left: Logo + Company + Nav (No changes needed) */}
      <div className="flex items-center space-x-8">
        <Link href="/" className="flex items-center space-x-2">
            <img src="/HomePage/Header/01_Logo.svg" alt="logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold text-blue-600">StockTracker Pro</h1>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          <Link href="/watchlist" className="text-gray-700 hover:text-blue-600">
            Watchlist
          </Link>
          <Link href="/portfolio" className="text-gray-700 hover:text-blue-600">
            Portfolio
          </Link>
        </nav>
      </div>

      {/* Center: Search (No changes needed) */}
       <div className="flex items-center border border-gray-300 rounded-md px-3 py-1 w-64">
         <Image
           src="/HomePage/Header/02_Search.svg"
           alt="Search Icon"
           width={20}
           height={20}
           className="opacity-70 mr-2"
         />
         <input
           type="text"
           placeholder="Search stocks..."
           className="w-full text-gray-800 outline-none text-sm"
         />
       </div>

      {/* Right: Auth Section - Simplified */}
      {/* 4. Conditionally render Login link OR Welcome + Logout button */}
      <div className="flex items-center space-x-4">
        {user ? (
          // USER IS LOGGED IN: Display Welcome message and Logout button
          <>
            <span className="text-gray-700 font-medium">Welcome, {user}!</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          // USER IS LOGGED OUT: Display ONLY Login link/button
          <Link
            href="/login"
            className="px-4 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded hover:bg-blue-50 transition"
          >
            Login
          </Link>
          /* Register button is removed */
        )}
      </div>
    </header>
  );
}