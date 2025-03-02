import { useState, useRef, useEffect } from "react";

const featuresList = [
  "Furnished",
  "Semi-furnished",
  "Unfurnished",
  "Air conditioning",
  "Ceiling fans",
  "Built-in wardrobes",
  "Walk-in closet",
  "En-suite bathroom",
  "Bathtub",
  "Shower cubicle",
  "Open-plan kitchen",
  "Separate kitchen",
  "Kitchen pantry",
  "Kitchen cabinets",
  "Laundry area",
  "Dining area",
  "Balcony",
];

const UnitFeatures = ({ selectedFeatures = [], setSelectedFeatures }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Ensure selectedFeatures is always an array
  const safeSelectedFeatures = Array.isArray(selectedFeatures)
    ? selectedFeatures
    : [];

  // Toggle feature selection
  const handleFeatureToggle = (feature) => {
    setSelectedFeatures((prevFeatures) => {
      if (!Array.isArray(prevFeatures)) prevFeatures = []; // Ensure it's an array

      return prevFeatures.includes(feature)
        ? prevFeatures.filter((item) => item !== feature) // Remove feature
        : [...prevFeatures, feature]; // Add feature
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full text-sm mt-2 max-w-md" ref={dropdownRef}>
      {/* Input Field */}
      <div
        className="w-full p-2 border rounded-md cursor-pointer bg-white"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {safeSelectedFeatures.length > 0
          ? safeSelectedFeatures.join(", ")
          : "Select Interior Features"}
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {featuresList.map((feature) => (
            <label
              key={feature}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={safeSelectedFeatures.includes(feature)}
                onChange={() => handleFeatureToggle(feature)}
              />
              {feature}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnitFeatures;
