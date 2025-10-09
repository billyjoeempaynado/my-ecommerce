import express from "express";
import { authenticate } from "../middleware/auth.js";
import User from "../models/User.js"; // ✅ correct model import

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "role", "created_at", "updated_at"], 
      order: [["id", "ASC"]],
    });

    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
