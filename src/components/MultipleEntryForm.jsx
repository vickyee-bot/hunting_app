import { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import UnitFeatures from "./UnitFeatures";
import RentalUnitSelector from "./RentalUnitSelector";

const MultipleEntryForm = ({ selectedEstate, selectedBuilding }) => {
  const [unitCount, setUnitCount] = useState("");
  const [unitType, setUnitType] = useState("");
  const [unitSize, setUnitSize] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [availability, setAvailability] = useState("");
  const [unitPrefix, setUnitPrefix] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEstate || !selectedBuilding) {
      alert("Please select an estate and building first.");
      return;
    }

    const unitData = {
      estateId: selectedEstate,
      buildingId: selectedBuilding,
      unitType: `${unitType.type} - ${unitType.size}`, // Convert to string ✅
      unitSize,
      interiorFeatures: selectedFeatures,
      unitPrice: Number(unitPrice),
      availability,
      unitPrefix,
      unitCount: Number(unitCount),
      images,
    };

    console.log("Sending Request:", unitData); // Debugging request payload

    try {
      const response = await fetch(
        "https://rentalke-server-2.onrender.com/api/v1/properties/manager/multiple-rental-units",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is valid
          },
          body: JSON.stringify(unitData),
        }
      );

      const responseData = await response.json(); // Read response body
      console.log("Server Response:", responseData);

      if (!response.ok) {
        console.error("Server Error:", responseData);
        throw new Error(responseData.message || "Failed to submit units");
      }

      alert("Units added successfully!");
    } catch (error) {
      console.error("Error submitting units:", error);
      alert(error.message);
    }
  };

  return (
    <div className="bg-white mb-8 p-6 rounded-lg shadow-md w-full">
      <p className="text-sm text-gray-600 mb-2">
        (Recommended for large buildings with similar units)
      </p>
      <div className="space-y-3">
        <input
          type="number"
          className="w-1/3 text-sm p-2 border rounded"
          placeholder="Enter the number of units..."
          value={unitCount}
          onChange={(e) => setUnitCount(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Unit Prefix (e.g., ROOM)"
          value={unitPrefix}
          onChange={(e) => setUnitPrefix(e.target.value)}
          className="w-1/3 text-sm p-2 border rounded-md mt-2"
        />

        <RentalUnitSelector unitData={unitType} setUnitData={setUnitType} />

        <input
          type="text"
          placeholder="Unit Size (e.g., 20 sqm)"
          value={unitSize}
          onChange={(e) => setUnitSize(e.target.value)}
          className="w-1/3 text-sm p-2 border rounded-md mt-2"
        />
        <br />
        <input
          type="text"
          placeholder="Rent Price in Ksh."
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
          className="w-1/3 text-sm p-2 border rounded-md mt-2"
        />
        <br />
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="w-1/3 text-sm p-2 border rounded-md mt-2 text-gray-500"
        >
          <option value="" disabled>
            Select Availability Status
          </option>
          <option value="VACANT">Available</option>
          <option value="OCCUPIED">Occupied</option>
        </select>

        <UnitFeatures
          selectedFeatures={selectedFeatures}
          setSelectedFeatures={setSelectedFeatures}
        />

        <ImageUploader images={images} onImagesUpload={setImages} />

        <button
          onClick={handleSubmit}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg w-full mt-4"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Units"}
        </button>
      </div>
    </div>
  );
};

export default MultipleEntryForm;
