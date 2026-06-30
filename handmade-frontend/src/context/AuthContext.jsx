import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("crafty_user")) || null; }
    catch { return null; }
  });

  // user shape: { id, name, email, role: "customer" | "seller", token }
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("crafty_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("crafty_user");
  };

  const isCustomer = user?.role === "customer";
  const isSeller   = user?.role === "seller";
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isCustomer, isSeller, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
