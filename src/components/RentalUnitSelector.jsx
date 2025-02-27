import React from "react";
import rentalData from "../data/rental_types.json"; // Adjust path as needed

const RentalUnitSelector = ({ singleUnit = {}, setSingleUnit }) => {
  // Ensure singleUnit has a default structure
  const selectedType = singleUnit.type || "";
  const selectedSize = singleUnit.size || "";

  // Extract rental types
  const rentalTypes = rentalData.rental_types.map((unit) => unit.type);

  // Find sizes based on selected type
  const unitSizes =
    rentalData.rental_types.find((unit) => unit.type === selectedType)?.sizes ||
    [];

  return (
    <div>
      {/* Unit Type Dropdown */}
      <select
        value={selectedType}
        onChange={(e) =>
          setSingleUnit({ ...singleUnit, type: e.target.value, size: "" })
        }
        className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[30%] xl:w-[30%] text-sm p-2 border rounded-md mt-2 bg-white text-gray-500"
      >
        <option value="" disabled>
          Select Unit Type
        </option>
        {rentalTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <br />

      {/* Unit Size Dropdown */}
      <select
        value={selectedSize}
        onChange={(e) => setSingleUnit({ ...singleUnit, size: e.target.value })}
        className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[30%] xl:w-[30%] text-sm p-2 border rounded-md mt-2 bg-white text-gray-500"
        disabled={!selectedType} // Disable if no type is selected
      >
        <option value="" disabled>
          Select Unit Size
        </option>
        {unitSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RentalUnitSelector;
