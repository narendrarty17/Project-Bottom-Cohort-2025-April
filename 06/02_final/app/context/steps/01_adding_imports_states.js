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
  const [user, setUser] = useState(null); // Renamed state variable and setter
  const [loading, setLoading] = useState(true);


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