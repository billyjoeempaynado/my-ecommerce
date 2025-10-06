"use client";

import { useState, useEffect } from "react";
import { deleteResource, fetchProducts } from "../../../../frontend/utils/api/products";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import GlobalViewModal from "../../../../frontend/components/admin/GlobalViewModal";
import GlobalEditModal from "../../../../frontend/components/admin/GlobalEditModal";
import ProductForm from "../../../../frontend/components/forms/ProductForm";
import GlobalDeleteModal from "../../../../frontend/components/admin/GlobalDeleteModal";
import { useNotification } from "../../../../frontend/components/Notification";

export default function ProductsPage() {
  const { addNotification } = useNotification();
  const [formDataForEdit, setFormDataForEdit] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // 🔹 Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // change this number as needed

  // ✅ Fetch products from backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // 🔹 Calculate paginated products
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="p-4">
      <div className="flex">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
      </div>

      {/* Loading/Error state */}
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Products table */}
      {!loading && !error && (
        <>
          <table className="w-full border-collapse border-gray-200 bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">SKU</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Supplier</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Stock</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.code}</td>
                  <td className="border px-4 py-2">{product.category?.name}</td>
                  <td className="border px-4 py-2">{product.supplier?.name}</td>
                  <td className="border px-4 py-2">${product.price}</td>
                  <td className="border px-4 py-2">{product.stock}</td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-evenly">
                      <button onClick={() => { setSelectedItem(product); setViewOpen(true); }}>
                        <EyeIcon className="h-5 w-5 text-blue-500" />
                      </button>
                      <button onClick={() => { setSelectedItem(product); setEditOpen(true); }}>
                        <PencilIcon className="h-5 w-5 text-green-500" />
                      </button>
                      <button onClick={() => { setSelectedItem(product); setDeleteOpen(true); }}>
                        <TrashIcon className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 🔹 Pagination Controls */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modals */}
      <GlobalViewModal
        isOpen={viewOpen}
        itemData={selectedItem}
        onClose={() => setViewOpen(false)}
      />

      <GlobalEditModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Product"
        onSave={() => {
          console.log("✅ Saving product:", formDataForEdit);
          setEditOpen(false);
        }}
      >
        <ProductForm
          isOpen={editOpen}
          initialData={selectedItem}
          onChange={(updatedData) => setFormDataForEdit(updatedData)}
        />
      </GlobalEditModal>

      <GlobalDeleteModal
        isOpen={deleteOpen}
        itemName="Product"
        onConfirm={async () => {
          try {
            await deleteResource("items", selectedItem.id);
            setProducts(products.filter((p) => p.id !== selectedItem.id));
            setDeleteOpen(false);
            addNotification("success", "✅ Product deleted successfully!");
          } catch (err) {
            console.error("❌ Error deleting:", err);
            addNotification("error", `❌ Failed to delete: ${err.message}`);
          }
        }}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}
