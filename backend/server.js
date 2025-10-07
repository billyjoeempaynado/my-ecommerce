import dotenv from "dotenv";          // Load environment variables from .env
dotenv.config();

import express from "express";        // Express framework
import cors from "cors";              // Enable Cross-Origin Resource Sharing
import sequelize from "./config/db.js";  // Sequelize instance connected to DB
import authRoutes from "./routes/auth.js";      // Auth routes (login/register)
import itemRoutes from "./routes/items.js";     // Item routes (CRUD)
import categoryRoutes from "./routes/categories.js";  // Category routes
import supplierRoutes from "./routes/suppliers.js"; // Supplier routes
import { authenticate, authorizeRole } from "./middleware/auth.js"; // JWT auth middleware


const app = express();
const PORT = process.env.PORT || 8080;  // Use env PORT or default to 8080

app.use(cors());              // Enable CORS for all origins
app.use(express.json());      // Parse incoming JSON requests

// ========================== ROUTES ==========================

// Auth endpoints (login/register)
app.use("/api/auth", authRoutes);

// Item endpoints (CRUD operations on items)
app.use("/api/items", itemRoutes);

// Category endpoints
app.use("/api/categories", categoryRoutes);

// Suppliers endpoints
app.use("/api/suppliers", supplierRoutes);

// ========================== TEST ROUTES ==========================

// Simple test route to verify items route works
app.get("/api/items/test", (req, res) => {
  res.json({ message: "✅ Items route works!" });
});

// Admin-protected route example
app.get("/api/admin", authenticate, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

// Authenticated user route example
app.get("/api/user", authenticate, (req, res) => {
  res.json({ message: `Hello ${req.user.username}` });
});

// ========================== START SERVER ==========================

  // Test DB connection
try {
  await sequelize.authenticate();
  console.log("✅ Database connected successfully!");
} catch (error) {
  console.error("❌ Database connection failed:", error);
}

// Sync database tables and start server
// `alter: true` will update table structures without dropping tables
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database sync failed:", err);
  });

