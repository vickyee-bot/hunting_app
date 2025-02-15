import React, { useState } from "react";
import { X } from "lucide-react"; // Importing an icon for delete (You need `lucide-react` installed)

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
    simulateUpload(newImages);
  };

  const simulateUpload = (newImages) => {
    newImages.forEach((image) => {
      let progress = 0;
      const interval = setInterval(() => {
        if (progress >= 100) {
          clearInterval(interval);
        } else {
          progress += 10;
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            [image.preview]: progress,
          }));
        }
      }, 300);
    });
  };

  const handleDeleteImage = (preview) => {
    setImages((prevImages) =>
      prevImages.filter((img) => img.preview !== preview)
    );
    setUploadProgress((prevProgress) => {
      const updatedProgress = { ...prevProgress };
      delete updatedProgress[preview];
      return updatedProgress;
    });
  };

  return (
    <div className="border-dashed border-2 p-4 text-center rounded-md">
      <p className="font-semibold">Upload Images</p>
      <p className="text-sm text-gray-500">PNG, JPG, JPEG files are allowed</p>

      <label
        htmlFor="fileUpload"
        className="mt-4 bg-gray-200 py-10 rounded-md flex items-center justify-center cursor-pointer"
      >
        <span className="text-gray-500">Drag & drop files or browse</span>
      </label>

      <input
        type="file"
        id="fileUpload"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        multiple
        onChange={handleImageChange}
      />

      {/* Image Previews with Upload Progress and Delete Button */}
      <div className="mt-4 flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative border p-2 rounded-md">
            <button
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              onClick={() => handleDeleteImage(image.preview)}
            >
              <X size={16} />
            </button>
            <img
              src={image.preview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="mt-2 text-sm text-gray-500">
              Uploading... {uploadProgress[image.preview] || 0}%
            </div>
            <div className="w-full bg-gray-300 h-2 mt-1 rounded-md">
              <div
                className="bg-blue-500 h-2 rounded-md"
                style={{ width: `${uploadProgress[image.preview] || 0}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
