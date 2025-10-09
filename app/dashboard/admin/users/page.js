"use client"; // this is now a Client Component

import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import GlobalViewModal from "../../../../frontend/components/admin/GlobalViewModal";
import { getUsers } from "../../../../frontend/utils/api/users";
import GlobalEditModal from "../../../../frontend/components/admin/GlobalEditModal";
import GlobalDeleteModal from "../../../../frontend/components/admin/GlobalDeleteModal";

export default function UsersPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); 

      // ✅ Fetch users from backend
      useEffect(() => {
        const loadUsers = async () => {
          try {
            setLoading(true);
            const data = await getUsers();
            setUsers(data);
          } catch (err) {
            console.error("❌ Error fetching users:", err.message);
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        loadUsers();
      }, []);



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

         {/* Loading/Error state */}
      {loading && <p>Loading supplier...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <table className="w-full border-collapse border-gray-200 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Date Created</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>

       <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                <div className="flex justify-evenly">
                  <button onClick={() => { setSelectedItem(user); setViewOpen(true); }}>
                    <EyeIcon className="h-5 w-5 text-blue-500" />
                  </button>
                  <button onClick={() => { setSelectedItem(user); setEditOpen(true); }}>
                    <PencilIcon className="h-5 w-5 text-green-500" />
                  </button>
                  <button onClick={() => { setSelectedItem(user); setDeleteOpen(true); }}>
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
        itemName={selectedItem?.name}
        onConfirm={() => { console.log("Deleted:", selectedItem); setDeleteOpen(false); }}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}
