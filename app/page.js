"use client";
import Link from "next/link";
import { useAuth } from "../frontend/context/AuthContext";
import Hero from "@/frontend/components/Hero";
import Sale from "@/frontend/components/Sale";
import Navbar from "@/frontend/components/Navbar";


export default function HomePage() {
  const { user } = useAuth();

  return (
    <>
    <Navbar />
    <main>
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center text-white bg-[url('/images/banner-background.png')]">
        <Hero />
      </section>

      {/* Sale Section */}
      <section>
        <Sale />
      </section>


    </main>
    </>
  );
}
