"use client";

import { useState } from "react";
import { useNotification } from "../Notification";

export default function GlobalAddModal({ 
  isOpen, 
  title = "Add Item", 
  fields = [], 
  onSave, 
  onClose,
  successMessage = "✅ Item added successfully!"
}) {
  const [formData, setFormData] = useState({});
  const { addNotification } = useNotification();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSave(formData); // 🔹 wait for async add
      addNotification("success", successMessage); // 🔹 show custom message
      console.log(successMessage);
    } catch (err) {
      addNotification("error", "❌ Failed to add item.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block font-medium mb-1">{field.label}</label>
              <input
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder || ""}
                onChange={handleChange}
                className="border rounded-md w-full p-2"
                required={field.required || false}
              />
            </div>
          ))}

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
