"use client";

import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import AsideBar from "./AsideBar";
import AdminNavbar from "./AdminNavbar";
import { NotificationProvider } from "../Notification";
import "../../../globals.css";

export default function AdminLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // redirect if not logged in
    } else if (user.role !== "admin") {
      router.push("/dashboard/user/home"); // redirect non-admin users
    }
  }, [user]);

  // Don't render until role is verified
  if (!user || user.role !== "admin") return null;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navbar */}
      <AdminNavbar />

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AsideBar />

        {/* Main content */}
        <NotificationProvider>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </NotificationProvider>
      </div>
    </div>
  );
}
