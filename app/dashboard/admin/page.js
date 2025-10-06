"use client";

import { useAuth } from "../../../frontend/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


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
    
    </>
  );
}
