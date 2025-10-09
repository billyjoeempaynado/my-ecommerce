
import { getAuthHeaders } from "./helpers";

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


// add supplier
export async function createSupplier(payload) {
  try {
    const res = await fetch("http://localhost:8080/api/suppliers", {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to add supplier");
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Error in addSupplier:", err);
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

// update supplier

export async function updateSupplier(id, payload) {
  try {
    const res = await fetch(`http://localhost:8080/api/suppliers/${id}`, {
      method: "PUT",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update supplier");
    }

    return await res.json(); // return updated supplier
  } catch (err) {
    console.error("❌ updateSupplier failed:", err.message);
    throw err;
  }
}