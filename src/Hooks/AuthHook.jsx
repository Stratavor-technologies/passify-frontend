import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('token'));
  useEffect(() => {
    const storedUser = localStorage.getItem('token');
    if (storedUser) {
      setLoggedIn(storedUser);
    }
  }, []);
  const getUserData = (value) => {
    setLoggedIn(value)
  };
  const setUserData = (value) => {
    setLoggedIn(value)
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, getUserData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
