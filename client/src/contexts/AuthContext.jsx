import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // MOCK USER for now - replace with Clerk logic later
  const [user, setUser] = useState({
    id: "user_123",
    name: "Demo User",
    email: "demo@careerforge.ai"
  });

  const value = {
    user,
    // Add login/logout functions here later
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};