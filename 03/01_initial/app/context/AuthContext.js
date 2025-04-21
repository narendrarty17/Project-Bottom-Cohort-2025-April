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

  const loginUser = useCallback((username) => {
    // Set user to 'Ram' if a non-empty username is provided
    if (username) {
      setUser(username);
    } else {
      console.warn('Auth Context: Attempted to login with empty username');
      setUser(null); // Keep user null if login fails or username is empty
    }
  }, []); // Empty dependency array means this function reference is stable

  // Function to log out the user - memoized with useCallback
  const logoutUser = useCallback(() => {
    setUser(null);
    console.log('Auth Context: User logged out (set to null)');
    // Optionally add API calls here
  }, []); // Empty dependency array means this function reference is stable

  // The value object provided to consuming components
  const value = {
    user,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};