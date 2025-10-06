"use client";
import React from "react";

export default function Reports() {
  const reports = [
    { product: "Laptop", sales: 15, revenue: "$18,000" },
    { product: "T-Shirt", sales: 50, revenue: "$1,250" },
    { product: "Coffee Mug", sales: 30, revenue: "$360" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Units Sold</th>
            <th className="border px-4 py-2">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, index) => (
            <tr key={index} className="border-t">
              <td className="border px-4 py-2">{r.product}</td>
              <td className="border px-4 py-2">{r.sales}</td>
              <td className="border px-4 py-2">{r.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
