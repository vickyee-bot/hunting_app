import React, { useState } from "react";
import ImageUploader from "../components/ImageUploader";

const AddBuilding = () => {
  const [customFeature, setCustomFeature] = useState("");
  const [features, setFeatures] = useState([
    "Parking",
    "Elevator",
    "Rooftop access",
    "CCTV",
  ]);

  const handleAddFeature = () => {
    if (customFeature.trim() !== "") {
      setFeatures([...features, customFeature]);
      setCustomFeature("");
    }
  };

  return (
    <div className="w-full bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
      {/* Tabs
      <div className="flex space-x-2 mb-4">
        {["Estate", "Buildings", "Units"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg ${
              tab === "Buildings" ? "bg-teal-300 text-white" : "bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div> */}
      <div>
        <a href="/add-estate">
          <button className="bg-gray-300 text-white p-0.5 px-2 text-center rounded-md mr-2 hover:bg-gray-400">
            Estate
          </button>
        </a>
        <a href="/add-building">
          <button className="bg-teal-300 text-white text-center rounded-md mr-2 p-0.5 px-2 hover:bg-teal-400">
            Building(s)
          </button>
        </a>
        <a href="/add-units">
          <button className="bg-gray-300 text-white px-2 text-center rounded-md mr-2 p-0.5 hover:bg-gray-400">
            Unit(s)
          </button>
        </a>
      </div>

      <h2 className="text-xl font-bold">
        Add Buildings in <span className="font-semibold">[estate name]</span>
      </h2>

      {/* Form Fields */}
      <div className="mt-4 space-y-4">
        {/* Building Name */}
        <div>
          <label className="block font-medium">Building Name:</label>
          <input
            type="text"
            placeholder="Enter building name..."
            className="w-[30%] p-0.5 border rounded-md mr-2 pl-2"
          />
        </div>

        {/* No. of Floors */}
        <div>
          <label className="block font-medium">No. of floors:</label>
          <input
            type="number"
            placeholder="Enter number..."
            className="w-[20%] p-0.5 border rounded-md pl-2"
          />
        </div>

        {/* Building Features */}
        <div>
          <label className="block font-medium">Building Features:</label>
          <div className="mt-2 space-y-1">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="checkbox" id={feature} />
                <label htmlFor={feature} className="cursor-pointer">
                  {feature}
                </label>
              </div>
            ))}
          </div>
          {/* Add Custom Feature */}
          <div className="mt-2 flex items-center space-x-2">
            <input
              type="text"
              value={customFeature}
              onChange={(e) => setCustomFeature(e.target.value)}
              placeholder="Add custom feature"
              className="flex p-1 px-3 border w-[20%] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button
              onClick={handleAddFeature}
              className="bg-teal-500 text-white p-1 rounded-lg hover:bg-teal-600"
            >
              Save
            </button>
          </div>
        </div>

        {/* Image Upload */}
        <div className="mt-4 w-[80%]">
          <ImageUploader />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-between mt-6">
          <a href="/add-estate">
            <button className="bg-teal-300 text-white px-4 py-2 rounded-lg hover:bg-teal-600 m-2">
              Back
            </button>
          </a>

          <button className="bg-teal-300 text-white px-4 py-2 rounded-lg hover:bg-teal-600 m-2">
            Save & Exit
          </button>
          <button className="bg-teal-300 text-white px-4 py-2 rounded-lg hover:bg-teal-600 m-2">
            Save & Add Another Building
          </button>
          <a href="/add-units">
            <button className="bg-teal-300 text-white px-4 py-2 rounded-lg hover:bg-teal-600 m-2">
              Save & Proceed
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddBuilding;
