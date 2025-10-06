import { useState, useRef } from "react";

export default function ImageUploader() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleDivClick = () => {
    fileInputRef.current.click(); // trigger hidden input
  };

  return (
    <div className="space-y-4">
      <div>

        {/* Upload area */}
        <div
          onClick={handleDivClick}
          className="border border-dashed rounded p-6 text-center text-gray-500 cursor-pointer hover:bg-gray-50"
        >
          Drop your images here or select
          <br />
          <span className="text-blue-600 underline">click to browse</span>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        {/* Preview thumbnails */}
        {files.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {files.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt="preview"
                className="h-24 w-24 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
