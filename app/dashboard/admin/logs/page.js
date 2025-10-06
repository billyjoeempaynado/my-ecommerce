"use client";
import React from "react";

export default function Logs() {
  const logs = [
    { id: 1, user: "Admin", action: "Deleted product Laptop", date: "2025-09-11 09:15" },
    { id: 2, user: "Admin", action: "Added new category Electronics", date: "2025-09-10 14:20" },
    { id: 3, user: "Staff", action: "Updated order #102", date: "2025-09-10 16:45" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Logs</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Action</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id} className="border-t">
              <td className="border px-4 py-2">{l.user}</td>
              <td className="border px-4 py-2">{l.action}</td>
              <td className="border px-4 py-2">{l.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
