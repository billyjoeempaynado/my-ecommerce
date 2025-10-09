"use client";

import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import {
  deleteResource,
  createCategory,
  getCategories,
  updateCategory,
} from "../../../../frontend/utils/api/categories";
import GlobalViewModal from "../../../../frontend/components/admin/GlobalViewModal";
import GlobalEditModal from "../../../../frontend/components/admin/GlobalEditModal";
import GlobalDeleteModal from "../../../../frontend/components/admin/GlobalDeleteModal";
import GlobalAddModal from "../../../../frontend/components/admin/GlobalAddModal";
import { useNotification } from "../../../../frontend/components/Notification";

export default function CategoriesPage() {
  const { addNotification } = useNotification();

  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // ---------------- Fetch categories ----------------
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
        setFilteredCategories(data);
      } catch (err) {
        console.error("❌ Error fetching categories:", err);
        setError(err.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  // ---------------- Search filter ----------------
  useEffect(() => {
    const filtered = categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
    setCurrentPage(1); // reset to first page
  }, [searchQuery, categories]);

  // ---------------- Add Category ----------------
  const handleAddCategory = async (newData) => {
    try {
      const newCategory = await createCategory(newData);
      const updatedList = [...categories, newCategory];
      setCategories(updatedList);
      setFilteredCategories(updatedList);
      setAddOpen(false);
      addNotification("success", "✅ Category added successfully!");
    } catch (err) {
      console.error("❌ Error adding category:", err);
      addNotification("error", `❌ Failed to add: ${err.message}`);
    }
  };

  // ---------------- Edit Category ----------------
  const handleEditCategory = async () => {
    try {
      if (!selectedItem?.id) throw new Error("Missing category ID");
      const updatedCategory = await updateCategory(selectedItem.id, formData);
      const updatedList = categories.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      );
      setCategories(updatedList);
      setFilteredCategories(updatedList);
      setEditOpen(false);
      addNotification("success", "✅ Category updated successfully!");
    } catch (err) {
      console.error("❌ Error updating category:", err);
      addNotification("error", `❌ Failed to update: ${err.message}`);
    }
  };

  // ---------------- Delete Category ----------------
  const handleDeleteCategory = async () => {
    try {
      await deleteResource("categories", selectedItem.id);
      const updatedList = categories.filter((cat) => cat.id !== selectedItem.id);
      setCategories(updatedList);
      setFilteredCategories(updatedList);
      setDeleteOpen(false);
      addNotification("success", "✅ Category deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting category:", err);
      addNotification("error", `❌ Failed to delete: ${err.message}`);
    }
  };

  // ---------------- Pagination helpers ----------------
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  return (
    <div className="p-4">
      {/* Header + Search */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search category..."
            className="border rounded px-3 py-1"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset page on search
            }}
          />
          <button
            onClick={() => setAddOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Category
          </button>
        </div>
      </div>

      {/* Loading/Error */}
      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Categories Table */}
      {!loading && !error && (
        <>
          <table className="w-full border-collapse border-gray-200 bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Date Created</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((category) => (
                <tr key={category.id} className="border-t">
                  <td className="border px-4 py-2">{category.name}</td>
                  <td className="border px-4 py-2">{category.description}</td>
                  <td className="border px-4 py-2">
                    {new Date(category.created_at).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-evenly">
                      <button
                        onClick={() => {
                          setSelectedItem(category);
                          setViewOpen(true);
                        }}
                      >
                        <EyeIcon className="h-5 w-5 text-blue-500" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(category);
                          setFormData({
                            name: category.name,
                            description: category.description,
                          });
                          setEditOpen(true);
                        }}
                      >
                        <PencilIcon className="h-5 w-5 text-green-500" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(category);
                          setDeleteOpen(true);
                        }}
                      >
                        <TrashIcon className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === idx + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
          </div>
        </>
      )}

      {/* ---------------- Modals ---------------- */}
      <GlobalViewModal
        isOpen={viewOpen}
        itemData={selectedItem}
        onClose={() => setViewOpen(false)}
      />

      <GlobalEditModal
        isOpen={editOpen}
        title="Edit Category"
        onSave={handleEditCategory}
        onClose={() => setEditOpen(false)}
      >
        <div className="flex flex-col gap-3 mt-2">
          <label className="flex flex-col">
            Name <span className="text-red-500">*</span>
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>

          <label className="flex flex-col">
            Description
            <textarea
              className="border rounded px-2 py-1"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </label>
        </div>
      </GlobalEditModal>

      <GlobalDeleteModal
        isOpen={deleteOpen}
        itemName="Category"
        onConfirm={handleDeleteCategory}
        onCancel={() => setDeleteOpen(false)}
      />

      <GlobalAddModal
        isOpen={addOpen}
        title="Add New Category"
        fields={[
          { name: "name", label: "Category Name", required: true },
          { name: "description", label: "Description" },
        ]}
        onSave={handleAddCategory}
        onClose={() => setAddOpen(false)}
        successMessage="✅ Category added successfully!"
      />
    </div>
  );
}
