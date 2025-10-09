"use client";
import { useState, useEffect } from "react";
import { getCategories} from "../../utils/api/categories";
import { getSuppliers} from "../../utils/api/suppliers";

export default function ProductForm({ isOpen = true, initialData = {}, onChange }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
    supplier_id: "",
    ...initialData, // pre-fill values if editing
  });

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // ✅ Fetch categories & suppliers only when modal/form opens
  useEffect(() => {
    if (isOpen) {
      getCategories().then(setCategories).catch(console.error);
      getSuppliers().then(setSuppliers).catch(console.error);
    }
  }, [isOpen]);

  // ✅ Keep formData in sync when switching from Add → Edit
  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...initialData }));
  }, [initialData]);

  // ✅ Handle input changes and pass data upward
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    if (onChange) onChange(updatedData); // notify parent (GlobalEditModal)
  };

  return (
    <div className="space-y-4">
      {/* Product Name */}
      <div>
        <label className="block font-semibold">Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>

      {/* Price */}
      <div>
        <label className="block font-semibold">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>

      {/* Stock */}
      <div>
        <label className="block font-semibold">Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>

      {/* Category Dropdown */}
      <div>
        <label className="block font-semibold">Category</label>
        <select
          name="category_id"
          value={formData.category_id || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Supplier Dropdown */}
      <div>
        <label className="block font-semibold">Supplier</label>
        <select
          name="supplier_id"
          value={formData.supplier_id || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
        >
          <option value="">-- Select Supplier --</option>
          {suppliers.map((sup) => (
            <option key={sup.id} value={sup.id}>
              {sup.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
