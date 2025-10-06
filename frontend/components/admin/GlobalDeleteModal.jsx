"use client";
import React from "react";

export default function GlobalDeleteModal({ isOpen, onConfirm, onCancel, itemName = "item" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
          Delete {itemName}?
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Are you sure you want to delete this {itemName}? This action cannot be undone.
        </p>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
