import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// 🔹 Middleware to check if user is authenticated
export function authenticate(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("📥 Token received:", token ? "Yes" : "No");

  if (!token) {
    console.warn("❌ No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.warn("❌ Invalid token");
      return res.status(403).json({ message: "Invalid token" });
    }

    // Attach user info to request
    req.user = decoded; // decoded = { id, username, role }
    console.log("✅ Token verified, user:", decoded.username);
    next();
  });
}

// 🔹 Middleware to restrict access by role
export function authorizeRole(role) {
  return (req, res, next) => {
    console.log("🔍 Checking role:", req.user.role, "Required:", role);
    if (req.user.role !== role) {
      console.warn("❌ Access denied for role:", req.user.role);
      return res.status(403).json({ message: "Access denied" });
    }
    console.log("✅ Role authorized:", role);
    next();
  };
}
