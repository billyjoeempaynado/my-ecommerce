"use client";
import React from "react";
import { ShoppingBagIcon, UserCircleIcon, BuildingStorefrontIcon, TagIcon } from "@heroicons/react/24/solid";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Overview() {
  const stats = [
    { title: "Products", count: 34, icon: <ShoppingBagIcon className="h-6 w-6 text-white" /> },
    { title: "Orders", count: 12, icon: <TagIcon className="h-6 w-6 text-white" /> },
    { title: "Users", count: 8, icon: <UserCircleIcon className="h-6 w-6 text-white" /> },
    { title: "Suppliers", count: 5, icon: <BuildingStorefrontIcon className="h-6 w-6 text-white" /> },
  ];

  const reports = [
    { product: "Laptop", sales: 15, revenue: "$18,000" },
    { product: "T-Shirt", sales: 50, revenue: "$1,250" },
    { product: "Coffee Mug", sales: 30, revenue: "$360" },
  ];

  // Example revenue trend data
  const revenueTrend = [
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 8000 },
    { month: "Mar", revenue: 12000 },
    { month: "Apr", revenue: 15000 },
    { month: "May", revenue: 18000 },
    { month: "Jun", revenue: 20000 },
  ];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.title} className="bg-blue-500 text-white p-4 rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">{s.title}</h2>
              <p className="text-2xl font-bold">{s.count}</p>
            </div>
            <div>{s.icon}</div>
          </div>
        ))}
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={revenueTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#1D4ED8" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Reports Table */}
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Top Selling Products</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Product</th>
              <th className="border px-4 py-2">Units Sold</th>
              <th className="border px-4 py-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="border px-4 py-2">{r.product}</td>
                <td className="border px-4 py-2">{r.sales}</td>
                <td className="border px-4 py-2">{r.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
