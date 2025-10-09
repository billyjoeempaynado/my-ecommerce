import { getAuthHeaders } from "./helpers";

// 🔹 Fetch Users
export async function getUsers() {
  try {
    const res = await fetch(`http://localhost:8080/api/users`, {
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
    console.error("❌ getUsers failed:", err.message);
    throw err;
  }
}