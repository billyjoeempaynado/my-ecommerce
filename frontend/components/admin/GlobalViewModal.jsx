"use client";
import React from "react";

export default function GlobalViewModal({ isOpen, onClose, itemData, title = "Details" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h2>

        <div className="mt-4 space-y-2 text-gray-700 dark:text-gray-200">
          {Object.entries(itemData).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="font-semibold">{key}:</span>
              <span>{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
