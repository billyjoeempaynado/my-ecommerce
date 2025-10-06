// components/admin/GlobalEditModal.js
"use client";
import React from "react";

export default function GlobalEditModal({ isOpen, onClose, title, onSave, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[500px] shadow-lg">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h2>

        {/* Dynamic form (injected as children) */}
        <div className="mt-4">{children}</div>

        {/* Footer buttons */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
