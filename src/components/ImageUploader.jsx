import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const ImageUploader = ({ onImagesUpload }) => {
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
    await uploadImages(newImages);
  };

  const uploadImages = async (newImages) => {
    const uploadedImageUrls = [];

    for (const image of newImages) {
      const formData = new FormData();
      formData.append("images", image.file);

      try {
        const response = await axios.post(
          "https://rentalke-server-2.onrender.com/api/v1/properties/upload-images",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress((prev) => ({
                ...prev,
                [image.preview]: percentCompleted,
              }));
            },
          }
        );

        if (response.data.success && response.data.urls) {
          console.log("Upload Response:", response.data); // Debugging
          uploadedImageUrls.push(...response.data.urls); // Extract all URLs
        } else {
          console.error("Upload failed:", response.data);
        }
      } catch (error) {
        console.error("Upload error:", error.message);
      }
    }

    // Update state after all uploads are done
    setUploadedUrls((prevUrls) => {
      const updatedUrls = [...prevUrls, ...uploadedImageUrls];
      console.log("Updated Uploaded URLs:", updatedUrls); // Debugging
      return updatedUrls;
    });

    // Ensure `onImagesUpload` is called correctly
    setTimeout(() => {
      onImagesUpload([...uploadedUrls, ...uploadedImageUrls]);
    }, 0);
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
