// src/routes/suppliers.js
import express from "express";
import { Supplier, Item } from "../models/index.js";   // Import models
import { authenticate, authorizeRole } from "../middleware/auth.js";


const router = express.Router();

// Only admins can create a supplier
router.post("/", authenticate, authorizeRole("admin"), async (req, res) => {

  // Extract field form request body
    const { name, email, phone, address } = req.body;

  try {
    // Create new supplier with the name from request body
    const supplier = await Supplier.create({ name, email, phone, address, person });
    res.json(supplier);  // Respond with created supplier
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all suppliers (with their items)
router.get("/", authenticate, async (req, res) => {
  try {
    const suppliers = await Supplier.findAll({
      include: [
        {
          model: Item,
          as: "items",                 // Alias from Supplier.hasMany(Item)
          attributes: ["id", "name", "code", "price", "stock", "created_at"] 
        }
      ]
    });

    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ✅ Delete supplier (admin only)
router.delete("/:id", authenticate, authorizeRole("admin"), async (req, res) => {
  console.log("Delete route hit with ID:", req.params.id);
  try {
    const { id } = req.params;

    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    await supplier.destroy();

    return res.status(200).json({
      message: "✅ Supplier deleted successfully",
      deletedId: id, // 👈 optional, helps frontend confirm
    });
  } catch (error) {
    console.error("❌ Error deleting supplier:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


// ================== UPDATE supplier ==================
// PUT /api/suppliers/:id
router.put("/:id", authenticate, authorizeRole("admin"), async (req, res) => {
  try {
    const supplierToUpdate = await Supplier.findByPk(req.params.id);
    if (!supplierToUpdate) return res.status(404).json({ error: "Supplier not found" });

    await supplierToUpdate.update(req.body);
    res.json(supplierToUpdate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
