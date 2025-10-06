"use client"; // this is now a Client Component

import { useState } from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import GlobalViewModal from "../../../../frontend/components/admin/GlobalViewModal";
import GlobalEditModal from "../../../../frontend/components/admin/GlobalEditModal";
import GlobalDeleteModal from "../../../../frontend/components/admin/GlobalDeleteModal";

export default function OrdersPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const orders = [
    { id: 101, customer: "John Doe", date: "2025-09-10", status: "Pending", total: "$1250" },
    { id: 102, customer: "Jane Smith", date: "2025-09-09", status: "Completed", total: "$45" },
    { id: 103, customer: "Alice Johnson", date: "2025-09-08", status: "Shipped", total: "$37" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <table className="w-full border-collapse border-gray-200 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.customer}</td>
              <td className="border px-4 py-2">{order.date}</td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">{order.total}</td>
              <td className="border px-4 py-2">
                <div className="flex justify-evenly">
                  {/* View */}
                  <button onClick={() => { setSelectedItem(order); setViewOpen(true); }}>
                    <EyeIcon className="h-5 w-5 text-blue-500" />
                  </button>

                  {/* Edit */}
                  <button onClick={() => { setSelectedItem(order); setEditOpen(true); }}>
                    <PencilIcon className="h-5 w-5 text-green-500" />
                  </button>

                  {/* Delete */}
                  <button onClick={() => { setSelectedItem(order); setDeleteOpen(true); }}>
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
        itemName={selectedItem?.customer}
        onConfirm={() => { console.log("Deleted:", selectedItem); setDeleteOpen(false); }}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}
