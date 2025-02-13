import React, { useState } from "react";

const EstateFeatures = () => {
  const [customFeature, setCustomFeature] = useState("");
  const [features, setFeatures] = useState([
    "Parking",
    "Elevator",
    "Rooftop access",
    "CCTV",
    "Playground",
    "Gated community with security",
    "24/7 security guards",
    "Perimeter wall with electric fence",
    "Reliable water supply",
    "Sewerage & waste disposal system",
  ]);

  const handleAddFeature = () => {
    if (customFeature.trim() !== "") {
      setFeatures([...features, customFeature]);
      setCustomFeature("");
    }
  };

  return (
    <div>
      {/* Estate Features */}
      <div>
        <label className="block font-medium">Estate Features:</label>
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
    </div>
  );
};

export default EstateFeatures;
