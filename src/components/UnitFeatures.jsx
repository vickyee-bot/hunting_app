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

const UnitFeatures = () => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle feature selection
  const handleFeatureToggle = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((item) => item !== feature)
        : [...prev, feature]
    );
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
    <div
      className="relative w-[80%] sm:w-[70%] md:w-[60%] lg:w-[30%] xl:w-[30%] text-sm mt-2 max-w-md"
      ref={dropdownRef}
    >
      {/* Input Field */}
      <div
        className="w-full p-2 border rounded-md cursor-pointer bg-white"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedFeatures.length > 0
          ? selectedFeatures.join(", ")
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
                checked={selectedFeatures.includes(feature)}
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
