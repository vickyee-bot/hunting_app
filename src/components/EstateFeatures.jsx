import React, { useState } from "react";

const EstateFeatures = () => {
  const [customFeature, setCustomFeature] = useState("");
  const [features, setFeatures] = useState([
    "Parking",
    "Elevator",
    "Rooftop access",
    "CCTV",
  ]);

  const addCustomFeature = () => {
    if (customFeature.trim()) {
      setFeatures([...features, customFeature]);
      setCustomFeature("");
    }
  };

  return (
    <div>
      <p className="font-semibold">Estate Features:</p>
      <div className="grid grid-cols-2 gap-2">
        {features.map((feature, index) => (
          <label key={index} className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" /> {feature}
          </label>
        ))}
      </div>
      <button
        className="bg-blue-400 text-white px-3 py-1 rounded-md mt-2"
        onClick={addCustomFeature}
      >
        + Add Custom Feature
      </button>
      <input
        type="text"
        className="border p-2 rounded-md w-full mt-2"
        placeholder="Enter custom feature"
        value={customFeature}
        onChange={(e) => setCustomFeature(e.target.value)}
      />
    </div>
  );
};

export default EstateFeatures;
