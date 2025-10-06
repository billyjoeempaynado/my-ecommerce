"use client";
import React, { useState } from "react";
import { FaSun, FaMoon, FaCog } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext"; // adjust path

export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleProfile = () => setProfileOpen(!profileOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-4 flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
        </div>

        {/* Center: Search */}
        <div className="flex-1 flex justify-center px-4">
            <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-md px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
        </div>

        {/* Right: Profile + Dark Mode */}
        <div className="flex items-center gap-4 flex-shrink-0 relative">
            {/* Dark Mode Button */}
            <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
            <button
                onClick={toggleProfile}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
                <span className="font-semibold mr-2">{user.username}</span>
                <img
                src="/images/blank-profile.jpg"
                alt="Profile"
                className="h-8 w-8 rounded-full border border-gray-300 dark:border-gray-700"
                />
            </button>

            {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                <ul className="flex flex-col py-1">
                    <li>
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => alert("Go to Settings")}
                    >
                        Settings
                    </button>
                    </li>
                    <li>
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => alert("Open Help")}
                    >
                        Help
                    </button>
                    </li>
                    <li>
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={logout}
                    >
                        Logout
                    </button>
                    </li>
                </ul>
                </div>
            )}
            </div>
        </div>
        </nav>

  );
}
