"use client";

import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { getSuppliers } from "../../../../frontend/utils/api/updateproduct";
import { deleteResource, createSupplier } from "../../../../frontend/utils/api/suppliers";
import GlobalViewModal from "../../../../frontend/components/admin/GlobalViewModal";
import GlobalEditModal from "../../../../frontend/components/admin/GlobalEditModal";
import GlobalDeleteModal from "../../../../frontend/components/admin/GlobalDeleteModal";
import { useNotification } from "../../../../frontend/components/Notification";
import GlobalAddModal from "../../../../frontend/components/admin/GlobalAddModal";



export default function SuppliersPage() {
  const { addNotification } = useNotification();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const handleAddSupplier = async (formData) => {
  try {
    const newSupplier = await createSupplier(formData);
    setSuppliers([...suppliers, newSupplier]);
    setAddOpen(false);
  } catch (err) {
    addNotification("error", `Error: ${err.message}`);
    }
  };

    // ✅ Fetch supplier from backend
    useEffect(() => {
      const loadSuppliers = async () => {
        try {
          setLoading(true);
          const data = await getSuppliers();
          setSuppliers(data);
        } catch (err) {
          console.error("❌ Error fetching supplier:", err.message);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      loadSuppliers();
    }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <button 
          onClick={() => setAddOpen(true)} 
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Supplier
        </button>
      </div>

        {/* Loading/Error state */}
      {loading && <p>Loading supplier...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <table className="w-full border-collapse border-gray-200 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Date Created</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <tr key={supplier.id} className="border-t">
                <td className="border px-4 py-2">{supplier.name}</td>
                <td className="border px-4 py-2">{supplier.email}</td>
                <td className="border px-4 py-2">{supplier.phone}</td>
                <td className="border px-4 py-2">{supplier.address}</td>
                <td className="border px-4 py-2">
                  {new Date(supplier.created_at).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-evenly">
                    {/* View */}
                    <button
                      onClick={() => {
                        setSelectedItem(supplier);
                        setViewOpen(true);
                      }}
                    >
                      <EyeIcon className="h-5 w-5 text-blue-500" />
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => {
                        setSelectedItem(supplier);
                        setEditOpen(true);
                      }}
                    >
                      <PencilIcon className="h-5 w-5 text-green-500" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => {
                        setSelectedItem(supplier);
                        setDeleteOpen(true);
                      }}
                    >
                      <TrashIcon className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No suppliers found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modals */}
      <GlobalViewModal
        isOpen={viewOpen}
        itemData={selectedItem}
        onClose={() => setViewOpen(false)}
      />
      <GlobalDeleteModal
        isOpen={deleteOpen}
        itemName="Supplier"
        onConfirm={async () => {
          try {
            const result = await deleteResource("suppliers", selectedItem.id);

            // ✅ Remove deleted supplier from UI
            setSuppliers(suppliers.filter((p) => p.id !== selectedItem.id));
            setDeleteOpen(false);

            // ✅ Use backend’s message if available
            addNotification("success", result.message || "✅ Supplier deleted successfully!");
          } catch (err) {
            console.error("❌ Error deleting:", err);
            addNotification("error", `❌ Failed to delete: ${err.message}`);
          }
        }}
        onCancel={() => setDeleteOpen(false)}
      />

      <GlobalAddModal
        isOpen={addOpen}
        title="Add New Supplier"
        fields={[
          { name: "name", label: "Name", required: true },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone" },
          { name: "address", label: "Address" },
        ]}
        onSave={handleAddSupplier}
        onClose={() => setAddOpen(false)}
        successMessage="✅ Supplier added successfully!"
      />

    </div>
  );
}
