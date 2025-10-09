"use client";

import { useState, useEffect } from "react";
import { deleteResource, fetchProducts, updateProduct } from "../../../../frontend/utils/api/products";
import { getCategories } from "../../../../frontend/utils/api/categories";
import { getSuppliers } from "../../../../frontend/utils/api/suppliers";
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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Filters & sorting
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // ✅ Load products, categories, suppliers
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [productsData, categoriesData, suppliersData] = await Promise.all([
          fetchProducts(),
          getCategories(),
          getSuppliers()
        ]);

        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
        setSuppliers(suppliersData);
      } catch (err) {
        console.error("❌ Error loading data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 🔹 Filter and search
  useEffect(() => {
    let temp = [...products];

    // Filter category
    if (selectedCategory) {
      temp = temp.filter(p => p.category?.name === selectedCategory);
    }

    // Filter supplier
    if (selectedSupplier) {
      temp = temp.filter(p => p.supplier?.name === selectedSupplier);
    }

    // Search
    if (searchText) {
      const lower = searchText.toLowerCase();
      temp = temp.filter(p => p.name.toLowerCase().includes(lower) || p.code.toLowerCase().includes(lower));
    }

    // Sort
    if (sortOption) {
      switch (sortOption) {
        case "name-asc":
          temp.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-desc":
          temp.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "price-asc":
          temp.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          temp.sort((a, b) => b.price - a.price);
          break;
        case "stock-asc":
          temp.sort((a, b) => a.stock - b.stock);
          break;
        case "stock-desc":
          temp.sort((a, b) => b.stock - a.stock);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(temp);
    setCurrentPage(1); // reset page
  }, [products, selectedCategory, selectedSupplier, searchText, sortOption]);

  // 🔹 Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0 md:space-x-4">
        <h1 className="text-2xl font-bold">Products</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Search by name or SKU"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border px-2 py-1 rounded"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>

          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">All Suppliers</option>
            {suppliers.map(sup => (
              <option key={sup.id} value={sup.name}>{sup.name}</option>
            ))}
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">No Sorting</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price Low → High</option>
            <option value="price-desc">Price High → Low</option>
            <option value="stock-asc">Stock Low → High</option>
            <option value="stock-desc">Stock High → Low</option>
          </select>
        </div>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

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
              {currentProducts.map(product => (
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

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : ""}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modals */}
      <GlobalViewModal isOpen={viewOpen} itemData={selectedItem} onClose={() => setViewOpen(false)} />
      <GlobalEditModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Product"
        onSave={async () => {
          try {
            if (!selectedItem?.id) throw new Error("Missing product ID");
            const updated = await updateProduct(selectedItem.id, formDataForEdit);

            // Update list & preserve filters
            setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
            setEditOpen(false);
            addNotification("success", "✅ Product updated successfully!");
          } catch (err) {
            console.error("❌ Error updating:", err.message);
            addNotification("error", `❌ Failed to update: ${err.message}`);
          }
        }}
      >
        <ProductForm
          isOpen={editOpen}
          initialData={selectedItem}
          onChange={updatedData => setFormDataForEdit(updatedData)}
        />
      </GlobalEditModal>

      <GlobalDeleteModal
        isOpen={deleteOpen}
        itemName="Product"
        onConfirm={async () => {
          try {
            await deleteResource("items", selectedItem.id);
            setProducts(products.filter(p => p.id !== selectedItem.id));
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
