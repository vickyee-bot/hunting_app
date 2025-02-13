import React from "react";

const ImageUploader = () => {
  return (
    <div className="border-dashed border-2 p-4 text-center rounded-md">
      <p className="font-semibold">Upload images</p>
      <p className="text-sm text-gray-500">png, jpg, jpeg files are allowed</p>
      <div className="mt-4 bg-gray-200 py-10 rounded-md flex items-center justify-center">
        <span className="text-gray-500">Drag & drop file or browse</span>
      </div>
    </div>
  );
};

export default ImageUploader;
