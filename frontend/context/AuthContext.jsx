"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ ESM named import
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter(); // add router


   // ✅ Login
  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token); // { id, username, role }
    setUser(decoded);
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/admin/login"); // redirect to login
  };

    // ✅ Watch user and redirect after logout
  useEffect(() => {
    if (user === null) {
      router.push("/admin/login");
    }
  }, [user, router]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
