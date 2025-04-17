// app/context/AuthContext.js
'use client'; // Context provider and hook need to be client-side

import React, { createContext, useState, useContext, useCallback } from 'react';

// Create the context with a default JavaScript object structure
const AuthContext = createContext({
  user: null,
  loginUser: () => { console.warn('loginUser function called without AuthProvider'); },
  logoutUser: () => { console.warn('logoutUser function called without AuthProvider'); },
});

// Create a custom hook for easy access to the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Runtime check remains useful even without TypeScript
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Create the Provider Component (no explicit prop types needed)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State holds 'Ram' or null

  // Create loginUser function with useCallback
 

  // Function to log out the user logoutUser - memoized with useCallback

  // The value object provided to consuming components
  const value = {
    user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};