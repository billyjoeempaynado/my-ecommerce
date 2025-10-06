import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
const router = express.Router();

// ✅ Mount routes
// app.use("/api/auth", authRoutes);

// 🔹 Register route
router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    console.log("📥 Register request received:", { username, role });

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in DB
    const user = await User.create({
      username,
      password: hashedPassword,
      role: role || "user"
    });

    console.log("✅ User registered:", user.username);

    res.json({ message: "User registered", user });
  } catch (err) {
    console.error("❌ Error in /register:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("📥 Login request received:", username);

    // Find user in DB
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.warn("❌ User not found:", username);
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.warn("❌ Invalid password for:", username);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Login successful, token generated for:", username);

    res.json({ token });
  } catch (err) {
    console.error("❌ Error in /login:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
