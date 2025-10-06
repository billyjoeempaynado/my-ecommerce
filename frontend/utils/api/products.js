

import { getAuthHeaders } from "./helpers";

// Add product
export async function addProduct(payload) {
  try {
    const res = await fetch("http://localhost:8080/api/items", {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to add item");
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Error in addProduct:", err);
    throw err;
  }
}

// 🔹 Generic delete
export async function deleteResource(type, id) {
  const res = await fetch(`http://localhost:8080/api/${type}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) throw new Error(`Failed to delete ${type}`);
  return true; // just return success flag
}


// Fetch products
export async function fetchProducts() {
  const res = await fetch("http://localhost:8080/api/items", {
          headers: {
            "Content-Type": "application/json",
             ...getAuthHeaders(),
          },
        });

         if (!res.ok) 
          throw new Error("Failed to fetch products");
        return await res.json();
}