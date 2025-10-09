"use client";

import React, { useEffect, useState } from "react";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  BuildingStorefrontIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ✅ Import your existing API utilities
import { fetchProducts } from "../../../../frontend/utils/api/products";
import { getSuppliers } from "../../../../frontend/utils/api/suppliers";
// import { fetchOrders } from "../../../../frontend/utils/api/orders";
// ⚠️ If you don’t have a users API yet, you can skip it or set manually
// import { fetchUsers } from "../../../../frontend/utils/api/users";

export default function Overview() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    suppliers: 0,
  });

  const [revenueTrend, setRevenueTrend] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all stats dynamically
  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);

        const [products, suppliers, orders] = await Promise.all([
          fetchProducts(),
          getSuppliers(),
          // fetchOrders(),
        ]);

        setStats({
          products: products.length,
          suppliers: suppliers.length,
          // orders: orders.length,
          users: 0, // replace with users.length once you have user API
        });

        // 📈 Optional: Compute revenue per month
        // const monthlyRevenue = {};
        // orders.forEach((order) => {
        //   const month = new Date(order.order_date).toLocaleString("default", {
        //     month: "short",
        //   });
        //   monthlyRevenue[month] =
        //     (monthlyRevenue[month] || 0) + (order.total_amount || 0);
        // });

        // const trendData = Object.entries(monthlyRevenue).map(
        //   ([month, revenue]) => ({
        //     month,
        //     revenue,
        //   })
        // );
        // setRevenueTrend(trendData);

        // 🏆 Top 5 products (sorted by stock or price)
        const sortedProducts = [...products].sort(
          (a, b) => b.stock - a.stock
        );
        setTopProducts(sortedProducts.slice(0, 5));
      } catch (err) {
        console.error("❌ Error loading stats:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const statCards = [
    {
      title: "Products",
      count: stats.products,
      icon: <ShoppingBagIcon className="h-6 w-6 text-white" />,
    },
    {
      title: "Orders",
      count: stats.orders,
      icon: <TagIcon className="h-6 w-6 text-white" />,
    },
    {
      title: "Users",
      count: stats.users,
      icon: <UserCircleIcon className="h-6 w-6 text-white" />,
    },
    {
      title: "Suppliers",
      count: stats.suppliers,
      icon: <BuildingStorefrontIcon className="h-6 w-6 text-white" />,
    },
  ];

  if (loading) return <p className="p-4">Loading dashboard...</p>;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Overview</h1>

      {/* 📊 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div
            key={s.title}
            className="bg-blue-500 text-white p-4 rounded-lg flex items-center justify-between"
          >
            <div>
              <h2 className="text-lg font-medium">{s.title}</h2>
              <p className="text-2xl font-bold">{s.count}</p>
            </div>
            <div>{s.icon}</div>
          </div>
        ))}
      </div>

      {/* 📈 Revenue Trend Chart */}
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
        {revenueTrend.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#1D4ED8"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No revenue data available</p>
        )}
      </div>

      {/* 🏆 Top Products Table */}
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Top Products</h2>
        {topProducts.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Product</th>
                <th className="border px-4 py-2">Stock</th>
                <th className="border px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="border px-4 py-2">{p.name}</td>
                  <td className="border px-4 py-2">{p.stock}</td>
                  <td className="border px-4 py-2">${p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
}
