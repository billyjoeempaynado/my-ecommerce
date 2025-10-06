// ========================== routes/items.js ==========================

import express from "express";
import { Item, Category, Supplier } from "../models/index.js";   // Import models (associations handled in index.js)
import { authenticate, authorizeRole } from "../middleware/auth.js";
import next from "next";

const router = express.Router();

// ========================== CREATE ITEM ==========================
// POST /api/items
// Protected route: requires login + "admin" role
router.post("/", authenticate, authorizeRole("admin"), async (req, res) => {
  try {
    // Extract fields from request body
    const { name, code, price, stock, category_id, supplier_id } = req.body;

    // Validate category exists before creating item
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(400).json({ error: "Invalid category_id" });
    }

    // Create new item in DB
    const item = await Item.create({ name, code, price, stock, category_id, supplier_id });

    // Respond with the created item
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========================== GET ALL ITEMS ==========================
// GET /api/items
// Fetch all items with their associated category info
router.get("/", authenticate, async (req, res) => {
  try {
    const items = await Item.findAll({
      include: [
        {
          model: Category,
          as: "category",               // Association alias set in models/index.js
          attributes: ["id", "name"]    // Only include category ID & name
        },
        {
          model: Supplier,
          as: "supplier", // 👈 must match the alias from association
          attributes: ["id", "name", "email", "phone"]
        }
        
      ]
    });

    // Respond with list of items + category
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================== DELETE Item ==================
// DELETE /api/items/:id
// Only admins should be allowed to delete items
router.delete("/:id", authenticate, authorizeRole("admin"), async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.destroy(); // Delete the item
    return res.status(200).json({ message: "Item deleted successfully" }); 
    // 👆 I prefer 200 + message instead of 204,
    // because the frontend often expects a JSON response
  } catch (error) {
    console.error("❌ Error deleting item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
