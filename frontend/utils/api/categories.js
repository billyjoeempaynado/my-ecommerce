import { getAuthHeaders } from "./helpers";

// 🔹 Fetch Categories
export async function getCategories() {
  const res = await fetch(`http://localhost:8080/api/categories`, {
    headers: { ...getAuthHeaders() },
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return await res.json();
}

// add category
export async function createCategory(payload) {
  try {
    const res = await fetch("http://localhost:8080/api/categories", {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to add category");
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Error in addCategory:", err);
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


// update categories

export async function updateCategory(id, payload) {
  try {
    const res = await fetch(`http://localhost:8080/api/categories/${id}`, {
      method: "PUT",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update category");
    }

    return await res.json(); // return updated category
  } catch (err) {
    console.error("❌ updateCategory failed:", err.message);
    throw err;
  }
}


