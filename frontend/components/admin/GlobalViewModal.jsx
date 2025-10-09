"use client";

export default function GlobalViewModal({ isOpen, itemData, onClose }) {
  if (!isOpen || !itemData) return null;

  // 🧹 List of keys to hide
  const hiddenKeys = ["id", "items", "createdAt", "updatedAt", "category_id", "supplier_id"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Details</h2>

        <div className="space-y-2">
          {Object.entries(itemData)
            .filter(([key]) => !hiddenKeys.includes(key)) // 🚫 filter out unwanted keys
            .map(([key, value]) => (
              <div key={key}>
                <strong className="capitalize">{key}: </strong>
                {typeof value === "object" && value !== null ? (
                  Array.isArray(value) ? (
                    <span>[Array hidden]</span>
                  ) : (
                    <span>{value.name || JSON.stringify(value)}</span>
                  )
                ) : (
                  <span>{String(value)}</span>
                )}
              </div>
            ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
