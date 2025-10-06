"use client";
import { useState, useEffect } from "react";
import { useNotification } from "../../../../frontend/components/Notification";
import { getCategories, getSuppliers} from "../../../../frontend/utils/api/updateproduct";
import { addProduct} from "../../../../frontend/utils/api/products";
import ImageUploader from "@/frontend/components/forms/imageUploader";


const AddProductForm = () => {
  const [categories, setCategories] = useState([]); // store categories
  const [suppliers, setSuppliers] = useState([]);
  const { addNotification } = useNotification();
  const [productData, setProductData] = useState({
    name: "",
    code: "",
    price: "",
    stock: "",
    category: "",
    supplier: "",
    description: "",
    size: "",
    date: "",
  });

  // ✅ Fetch categories when component mounts
  useEffect(() => {
      getCategories().then(setCategories).catch(console.error);
  }, []);

    // ✅ Fetch categories when component mounts
  useEffect(() => {
      getSuppliers().then(setSuppliers).catch(console.error);
  }, []);

    // ✅ Auto-generate code
    const generateCode = (name) => {
      if (!name) return "";
      const prefix = name.substring(0, 2).toUpperCase();
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      return `${prefix}${randomNum}`;
    };

    // ✅ Handle input change
    const handleChange = (e) => {
      const { name, value } = e.target;

      if (name === "name") {
        setProductData({
          ...productData,
          name: value,
          code: generateCode(value),
        });
      } else {
        setProductData({ ...productData, [name]: value });
      }
    };

      // ✅ Submit form (send to backend)
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const payload = {
          name: productData.name,
          code: productData.code,
          price: parseFloat(productData.price) || 0, // convert to number
          stock: parseInt(productData.stock, 10) || 0,
          category_id: parseInt(productData.category, 10),
          supplier_id: parseInt(productData.supplier, 10),
          description: productData.description,
          size: productData.size,
          date: productData.date,
        };

        // ✅ Call your API helper
        const result = await addProduct(payload);

        addNotification("success", "✅ Item added successfully!");
        console.log("✅ Item added:", result);

        // Reset form
        setProductData({
          name: "",
          code: "",
          price: "",
          stock: "",
          category: "",
          supplier: "",
          description: "",
          size: "",
          date: "",
        });
      } catch (err) {
        console.error("❌ Error adding product:", err.message || err);
        addNotification("error", `❌ Failed to add item: ${err.message}`);
      }
    };


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto bg-white p-6 shadow rounded"
      >
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Product name</label>
            <input
              name="name"
              type="text"
              value={productData.name || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Auto-generated Code (read-only) */}
          <div>
            <label className="block font-medium mb-1">Product Code</label>
            <input
              name="code"
              type="text"
              value={productData.code || ""}
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              name="category"
              value={productData.category || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Supplier */}
          <div>
            <label className="block font-medium mb-1">Supplier</label>
            <select
              name="supplier"
              value={productData.supplier || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select a supplier</option>
              {suppliers.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={productData.description || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 h-32 resize-none"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Upload images</label>
            <div className="border border-dashed rounded p-6 text-center text-gray-500 cursor-pointer hover:bg-gray-50">
             <ImageUploader />
            </div>
          </div>

          {/* Price & Stock */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">Price</label>
              <input
                name="price"
                type="number"
                value={productData.price || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Stock</label>
              <input
                name="stock"
                type="number"
                value={productData.stock || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Size & Date */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">Size</label>
              <input
                name="size"
                type="text"
                value={productData.size || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Product date</label>
              <input
                name="date"
                type="date"
                value={productData.date || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
