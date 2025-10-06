"use client";

import { useAuth } from "../../../frontend/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/frontend/components/Navbar";

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // redirect if not logged in
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <Navbar />
    <div className="p-6">
      <h1 className="mt-20 text-2xl">Welcome, {user?.username}!</h1>
      <p>Role: {user?.role}</p>
      <button
        onClick={logout}
        className="mt-20 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
    </>
  );
}
