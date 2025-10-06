"use client"; // make this a client component

import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { getCategories} from "../../../../frontend/utils/api/updateproduct";
import { deleteResource, createCategory} from "../../../../frontend/utils/api/categories";
import GlobalViewModal from "../../../../frontend/components/admin/GlobalViewModal";
import GlobalEditModal from "../../../../frontend/components/admin/GlobalEditModal";
import GlobalDeleteModal from "../../../../frontend/components/admin/GlobalDeleteModal";
import GlobalAddModal from "../../../../frontend/components/admin/GlobalAddModal";
import { useNotification } from "../../../../frontend/components/Notification";


export default function CategoriesPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const { addNotification } = useNotification();
  

    const handleAddCategory = async (formData) => {
    try {
      const newCategory = await createCategory(formData);
      setCategories([...categories, newCategory]); // update UI
      setAddOpen(false);
    } catch (err) {
      console.error("❌ Error adding category:", err);
    }
  };

    // ✅ Fetch Categories from backend
    useEffect(() => {
      const loadCategories = async () => {
        try {
          setLoading(true);
          const data = await getCategories();
          setCategories(data);
        } catch (err) {
          console.error("❌ Error fetching categories", err.message);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      loadCategories();
    }, []);

  return (
    <div className="p-4">
            <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button 
          onClick={() => setAddOpen(true)} 
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Category
        </button>
      </div>

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
          {categories.map((category) => (
            <tr key={category.id} className="border-t">
              <td className="border px-4 py-2">{category.name}</td>
              <td className="border px-4 py-2">{category.description}</td>
              <td className="border px-4 py-2">{category.created_at}</td>
              <td className="border px-4 py-2">
                <div className="flex justify-evenly">
                  {/* View */}
                  <button onClick={() => { setSelectedItem(category); setViewOpen(true); }}>
                    <EyeIcon className="h-5 w-5 text-blue-500" />
                  </button>

                  {/* Edit */}
                  <button onClick={() => { setSelectedItem(category); setEditOpen(true); }}>
                    <PencilIcon className="h-5 w-5 text-green-500" />
                  </button>

                  {/* Delete */}
                  <button onClick={() => { setSelectedItem(category); setDeleteOpen(true); }}>
                    <TrashIcon className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      <GlobalViewModal
        isOpen={viewOpen}
        itemData={selectedItem}
        onClose={() => setViewOpen(false)}
      />
      <GlobalEditModal
        isOpen={editOpen}
        itemData={selectedItem}
        onSave={(data) => console.log("Saved:", data)}
        onClose={() => setEditOpen(false)}
      />
      <GlobalDeleteModal
        isOpen={deleteOpen}
        itemName="Category"
        onConfirm={async () => {
           try {
                 await deleteResource("categories", selectedItem.id);
                 setCategories(categories.filter((p) => p.id !== selectedItem.id));
                 setDeleteOpen(false);
                 addNotification("success", "✅ Category deleted successfully!");
                } catch (err) {
                  console.error("❌ Error deleting:", err);
                  addNotification("error", `❌ Failed to delete: ${err.message}`);
                }
              }}
              onCancel={() => setDeleteOpen(false)}
       />

      {/* Add Modal */}
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
