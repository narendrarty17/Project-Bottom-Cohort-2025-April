// app/context/AuthContext.js
'use client';

// Keep React imports, remove useEffect from here if not used elsewhere
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const AUTH_STORAGE_KEY = 'authUser';

const AuthContext = createContext({
  user: null,
  // Keep placeholders
  loginUser: () => { console.warn('loginUser function called without AuthProvider'); },
  logoutUser: () => { console.warn('logoutUser function called without AuthProvider'); },
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // 1. Initialize state to null consistently on server and client initial render
  const [user, setUser] = useState(null);
  // Add a state to track if hydration is complete and localStorage has been checked
  const [isInitialized, setIsInitialized] = useState(false);

  // 2. Use useEffect to load state from localStorage AFTER initial mount/hydration
  useEffect(() => {
    // This effect runs only on the client, after the component mounts
    try {
      const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedUser) {
        setUser(storedUser); // Set state based on localStorage
        console.log(`Auth Context: User '${storedUser}' loaded from localStorage`);
      } else {
        console.log('Auth Context: No user found in localStorage');
      }
    } catch (error) {
      setUser(null);
    } finally {
        // Mark initialization as complete regardless of finding a user or errors
        setIsInitialized(true);
    }
    // Run this effect only once on mount
  }, []);

  // 3. Update localStorage when user state changes (login/logout)
  useEffect(() => {
    // Only attempt to write to localStorage after initial check is done
    // And ensure we are on the client
    if (isInitialized && typeof window !== 'undefined') {
      try {
        if (user) {
          // If storing complex objects, use JSON.stringify
          // window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
          window.localStorage.setItem(AUTH_STORAGE_KEY, user);
        } else {
          window.localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch (error) {
        console.error("Auth Context: Error writing to localStorage key “" + AUTH_STORAGE_KEY + "”:", error);
      }
    }
    // Run this effect when user state changes *or* initialization completes
  }, [user, isInitialized]);

  // Login function remains the same - it just calls setUser
  const loginUser = useCallback((username) => {
    if (username) {
      setUser(username);
      console.log(`Auth Context: User logged in as '${username}'`);
    } else {
      console.warn('Auth Context: Attempted to login with empty username');
      setUser(null);
    }
  }, []);

  // Logout function remains the same - it just calls setUser
  const logoutUser = useCallback(() => {
    setUser(null);
    console.log('Auth Context: User logged out');
  }, []);

  // Include isInitialized in the context value if components need to wait for auth check
  const value = {
    user,
    isInitialized, // Components can use this to show loading states
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};