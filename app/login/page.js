"use client"; // Marks this file as a client-side component in Next.js

import { useState } from "react"; // React hook to manage local state
import { useRouter } from "next/navigation"; // Next.js hook for programmatic navigation
import { useAuth } from "../../frontend/context/AuthContext"; // Custom hook to access Auth context
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  // Local state for input fields and error message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter(); // Router instance for redirection
  const { login, user } = useAuth(); // AuthContext method to save token // the user is now decoded here

  // Function triggered when the login form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    setError(""); // Reset error state

    try {
      // Send login request to backend API
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }), // Send username + password
      });

       console.log("🔹 Response status:", res.status);

      const data = await res.json(); // Parse response as JSON
      console.log("🔹 Response data:", data);
      // If login fails, show error message from API or fallback text
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // If login succeeds, save token to AuthContext
      login(data.token);

      // Save JWT in cookie (for middleware) or localStorage
      document.cookie = `token=${data.token}; path=/`;

      // Decode role directly (don’t wait for user)
      const decoded = jwtDecode(data.token);
      // Redirect user to dashboard page
      
      if (decoded.role === 'admin') {
        router.push('/dashboard/admin/overview');
      } else {
        router.push('/dashboard/user');
      }
    } catch (err) {
      // Handle unexpected errors (e.g., server down, network issues)
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    // Fullscreen container with centered form
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit} // Calls handleSubmit when form is submitted
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Show error message if login fails */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Username field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username} // Controlled input bound to state
            onChange={(e) => setUsername(e.target.value)} // Update state on change
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* Password field */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password} // Controlled input bound to state
            onChange={(e) => setPassword(e.target.value)} // Update state on change
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
