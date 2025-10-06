"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi"; // login icon

export default function Navbar() {
    const { user } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const textColor = pathname === "/" ? "text-white" : "text-black";

  return (
    <nav
      className={`absolute top-0 left-0 w-full flex justify-between items-center p-4 z-50 ${textColor}`}
    >
      {/* Logo */}
      <h1 className="text-xl font-bold">My Store</h1>

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center gap-8">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/shop">Shop</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>

      {/* Cart (desktop only) */}
    <div className="hidden md:flex relative cursor-pointer">
    {user ? (
        // ✅ Show Profile if logged in
        <Link href="/profile">
        <FaUserCircle size={24} />
        </Link>
    ) : (
        // ✅ Show Login if not logged in
        <Link href="/login">
        <p>Sign In</p>
        </Link>
    )}
    </div>

      {/* Burger Button (mobile only) */}
      <button onClick={() => setIsOpen(true)} className="md:hidden">
        <Menu size={28} />
      </button>

      {/* Fullscreen Overlay Menu */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-md text-white flex flex-col items-center justify-center transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6"
        >
          <X size={32} />
        </button>

        {/* Mobile Nav */}
        <ul className="flex flex-col items-center gap-8 text-2xl font-semibold">
          <li>
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li>
            <Link href="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          </li>
          <li className="relative cursor-pointer">
            <Link href="/Dashboard" onClick={() => setIsOpen(false)}>
              <FaShoppingCart size={28} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
