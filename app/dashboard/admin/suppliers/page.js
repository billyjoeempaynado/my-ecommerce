"use client";

import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { deleteResource, createSupplier, getSuppliers, updateSupplier} from "../../../../frontend/utils/api/suppliers";
import GlobalViewModal from "../../../../frontend/components/admin/GlobalViewModal";
import GlobalEditModal from "../../../../frontend/components/admin/GlobalEditModal";
import GlobalDeleteModal from "../../../../frontend/components/admin/GlobalDeleteModal";
import GlobalAddModal from "../../../../frontend/components/admin/GlobalAddModal";
import { useNotification } from "../../../../frontend/components/Notification";

export default function SuppliersPage() {
  const { addNotification } = useNotification();

  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
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

  // ---------------- Fetch suppliers ----------------
  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        setLoading(true);
        const data = await getSuppliers();
        setSuppliers(data);
        setFilteredSuppliers(data);
      } catch (err) {
        console.error("❌ Error fetching suppliers:", err);
        setError(err.message || "Failed to fetch suppliers");
      } finally {
        setLoading(false);
      }
    };
    loadSuppliers();
  }, []);

  // ---------------- Search filter ----------------
  useEffect(() => {
    const filtered = suppliers.filter((sup) =>
      sup.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSuppliers(filtered);
    setCurrentPage(1); // reset to first page
  }, [searchQuery, suppliers]);

  // ---------------- Add Supplier ----------------
  const handleAddSupplier = async (newData) => {
    try {
      const newSupplier = await createSupplier(newData);
      const updatedList = [...suppliers, newSupplier];
      setSuppliers(updatedList);
      setFilteredSuppliers(updatedList);
      setAddOpen(false);
      addNotification("success", "✅ Supplier added successfully!");
    } catch (err) {
      console.error("❌ Error adding supplier:", err);
      addNotification("error", `❌ Failed to add: ${err.message}`);
    }
  };

  // ---------------- Edit Supplier ----------------
  const handleEditSupplier = async () => {
    try {
      if (!selectedItem?.id) throw new Error("Missing supplier ID");
      const updatedSupplier = await updateSupplier(selectedItem.id, formData);
      const updatedList = suppliers.map((sup) =>
        sup.id === updatedSupplier.id ? updatedSupplier : sup
      );
      setSuppliers(updatedList);
      setFilteredSuppliers(updatedList);
      setEditOpen(false);
      addNotification("success", "✅ Supplier updated successfully!");
    } catch (err) {
      console.error("❌ Error updating supplier:", err);
      addNotification("error", `❌ Failed to update: ${err.message}`);
    }
  };

  // ---------------- Delete Supplier ----------------
  const handleDeleteSupplier = async () => {
    try {
      await deleteResource("suppliers", selectedItem.id);
      const updatedList = suppliers.filter((sup) => sup.id !== selectedItem.id);
      setSuppliers(updatedList);
      setFilteredSuppliers(updatedList);
      setDeleteOpen(false);
      addNotification("success", "✅ Supplier deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting supplier:", err);
      addNotification("error", `❌ Failed to delete: ${err.message}`);
    }
  };

  // ---------------- Pagination helpers ----------------
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSuppliers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);

  return (
    <div className="p-4">
      {/* Header + Search */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search supplier..."
            className="border rounded px-3 py-1"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button
            onClick={() => setAddOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Supplier
          </button>
        </div>
      </div>

      {/* Loading/Error */}
      {loading && <p>Loading suppliers...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Suppliers Table */}
      {!loading && !error && (
        <>
          <table className="w-full border-collapse border-gray-200 bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Contact Person</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Date Created</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((supplier) => (
                <tr key={supplier.id} className="border-t">
                  <td className="border px-4 py-2">{supplier.name}</td>
                  <td className="border px-4 py-2">{supplier.person}</td>
                  <td className="border px-4 py-2">{supplier.email}</td>
                  <td className="border px-4 py-2">{supplier.phone}</td>
                  <td className="border px-4 py-2">{supplier.address}</td>
                  <td className="border px-4 py-2">
                    {new Date(supplier.created_at).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-evenly">
                      <button onClick={() => { setSelectedItem(supplier); setViewOpen(true); }}>
                        <EyeIcon className="h-5 w-5 text-blue-500" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(supplier);
                          setFormData({
                            name: supplier.name,
                            person: supplier.person,
                            email: supplier.email,
                            phone: supplier.phone,
                            address: supplier.address,
                          });
                          setEditOpen(true);
                        }}
                      >
                        <PencilIcon className="h-5 w-5 text-green-500" />
                      </button>
                      <button onClick={() => { setSelectedItem(supplier); setDeleteOpen(true); }}>
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
        title="Edit Supplier"
        onSave={handleEditSupplier}
        onClose={() => setEditOpen(false)}
      >
        <div className="flex flex-col gap-3 mt-2">
          <label className="flex flex-col">
            Name <span className="text-red-500">*</span>
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </label>
           <label className="flex flex-col">
            Contact Person
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={formData.person || ""}
              onChange={(e) => setFormData({ ...formData, person: e.target.value })}
            />
          </label>
          <label className="flex flex-col">
            Email
            <input
              type="email"
              className="border rounded px-2 py-1"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </label>
          <label className="flex flex-col">
            Phone
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </label>
          <label className="flex flex-col">
            Address
            <textarea
              className="border rounded px-2 py-1"
              value={formData.address || ""}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </label>
        </div>
      </GlobalEditModal>

      <GlobalDeleteModal
        isOpen={deleteOpen}
        itemName="Supplier"
        onConfirm={handleDeleteSupplier}
        onCancel={() => setDeleteOpen(false)}
      />

      <GlobalAddModal
        isOpen={addOpen}
        title="Add New Supplier"
        fields={[
          { name: "name", label: "Name", required: true },
          { name: "person", label: "Contact Person" },
          { name: "email", label: "Email" },
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
