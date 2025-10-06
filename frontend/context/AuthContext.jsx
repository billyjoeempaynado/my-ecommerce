"use client";
import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ ESM named import
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter(); // add router

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token); // { id, username, role }
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login"); // redirect to login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
