// ========================== routes/categories.js ==========================

import express from "express";
import { Category } from "../models/index.js";
import { authenticate, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

// ========================== CREATE CATEGORY ==========================
// POST /api/categories
// Only admins can create a category
router.post("/", authenticate, authorizeRole("admin"), async (req, res) => {
  try {
    
    // Extract field form request body
    const { name, description} = req.body;

    // Create new category with the name from request body
    const category = await Category.create({ name, description});
    res.json(category);  // Respond with created category
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========================== GET ALL CATEGORIES ==========================
// GET /api/categories
// ✅ Fetch all categories from DB
router.get("/", authenticate, async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "name", "description", "created_at"], // select columns you want
      order: [["id", "ASC"]]
    });

    res.json(categories); // Respond with array of categories
  } catch (err) {
    console.error("❌ Error fetching categories:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ================== DELETE category ==================
// DELETE /api/category/:id
// Only admins should be allowed to delete category
router.delete("/:id", authenticate, authorizeRole("admin"), async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }

    await category.destroy(); // Delete the category
    return res.status(200).json({ message: "category deleted successfully" }); 
    // 👆 I prefer 200 + message instead of 204,
    // because the frontend often expects a JSON response
  } catch (error) {
    console.error("❌ Error deleting category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// ================== UPDATE category ==================
// PUT /api/categories/:id
router.put("/:id", authenticate, authorizeRole("admin"), async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    await category.update(req.body);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router;
