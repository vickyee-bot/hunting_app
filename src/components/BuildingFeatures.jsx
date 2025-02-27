import React, { useState } from "react";

const BuildingFeatures = () => {
  const [customFeature, setCustomFeature] = useState("");
  const [features, setFeatures] = useState([
    "Parking",
    "Elevator",
    "Rooftop access",
    "CCTV",
    "Playground",
    "Gated community with security",
    "24/7 security guards",
  ]);
  const [selectedFeatures, setSelectedFeatures] = useState(new Set());

  const handleAddFeature = () => {
    if (customFeature.trim() !== "" && !features.includes(customFeature)) {
      const updatedFeatures = [...features, customFeature];
      setFeatures(updatedFeatures);

      // Automatically select the newly added feature
      setSelectedFeatures(new Set([...selectedFeatures, customFeature]));

      setCustomFeature(""); // Clear input field
    }
  };

  const handleFeatureToggle = (feature) => {
    const updatedSelection = new Set(selectedFeatures);
    if (updatedSelection.has(feature)) {
      updatedSelection.delete(feature); // Deselect if already selected
    } else {
      updatedSelection.add(feature); // Select if not already selected
    }
    setSelectedFeatures(updatedSelection);
  };

  return (
    <div>
      {/* Estate Features */}
      <div>
        <label className="block font-medium">Estate Features:</label>
        <div className="mt-2 space-y-1">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={feature}
                checked={selectedFeatures.has(feature)}
                onChange={() => handleFeatureToggle(feature)}
              />
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
            className="flex p-1 px-3 border w-[70%] sm:w-[50%] md:w-[50%] lg:w-[30%] xl:w-[30%] text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            onClick={handleAddFeature}
            className="bg-teal-500 text-white px-2 py-1 rounded-lg hover:bg-teal-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuildingFeatures;
