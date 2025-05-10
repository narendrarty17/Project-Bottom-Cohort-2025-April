// app/context/AuthContext.js
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../../firebase/firebaseConfig'; // Adjust path
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Create the context
const AuthContext = createContext({
  user: null,     
  loading: true,
  logoutUser: async () => { console.warn('logoutUser function called without AuthProvider'); },
});

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listener for Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Auth state changed");
      console.log(user);
      setUser(firebaseUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Logout function
  const logoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      console.log("Logout successful via context");
    } catch (error) {
      console.error("Logout failed:", error);
      setLoading(false);
    }
  };

  // The context value
  const value = {
    user,        // Renamed: Provide the 'user' state (Firebase object or null)
    loading,
    logoutUser,
  };

  // Render children only when the initial auth check is done
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};