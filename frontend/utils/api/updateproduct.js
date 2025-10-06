
import { getAuthHeaders } from "./helpers";

// this is used in add product and update product

// 🔹 Fetch Categories
export async function getCategories() {
  const res = await fetch(`http://localhost:8080/api/categories`, {
    headers: { ...getAuthHeaders() },
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return await res.json();
}

// 🔹 Fetch Suppliers
export async function getSuppliers() {
  try {
    const res = await fetch(`http://localhost:8080/api/suppliers`, {
      headers: { ...getAuthHeaders() },
    });

    if (!res.ok) {
      // 🔍 Try to parse backend error for debugging
      let errorMsg = `HTTP ${res.status}`;
      try {
        const errorData = await res.json();
        errorMsg += ` - ${errorData.error || JSON.stringify(errorData)}`;
      } catch {
        errorMsg += " - Failed to parse error response";
      }
      throw new Error(errorMsg);
    }

    return await res.json();
  } catch (err) {
    console.error("❌ getSuppliers failed:", err.message);
    throw err;
  }
}
