import { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import UnitFeatures from "../components/UnitFeatures";
import RentalUnitSelector from "./RentalUnitSelector";

const SingleEntryForm = ({ selectedEstate, selectedBuilding }) => {
  const [singleUnit, setSingleUnit] = useState({
    number: "",
    type: "",
    size: "",
    rent: "",
    status: "",
    images: [],
    features: [], // Holds user-selected features dynamically
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const addSingleUnit = async () => {
    setLoading(true);
    setMessage("");

    const requestBody = {
      estateId: selectedEstate,
      buildingId: selectedBuilding,
      name: singleUnit.number,
      unitType: singleUnit.type,
      unitSize: singleUnit.size,
      interiorFeatures: singleUnit.features, // Dynamic features
      unitPrice: singleUnit.rent ? parseFloat(singleUnit.rent) : 0,
      images: singleUnit.images,
      availability: singleUnit.status || "VACANT",
    };

    console.log("Request Body Sent to Database:", requestBody);

    try {
      const response = await fetch(
        "https://rentalke-server-2.onrender.com/api/v1/properties/manager/rental-unit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            estateId: selectedEstate,
            buildingId: selectedBuilding,
            name: singleUnit.number,
            unitType: singleUnit.type,
            unitSize: singleUnit.size,
            interiorFeatures: singleUnit.features, // Dynamic features
            unitPrice: singleUnit.rent ? parseFloat(singleUnit.rent) : 0,
            images: singleUnit.images,
            availability: singleUnit.status || "VACANT",
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to add unit");

      alert("Rental unit added successfully!");
      setSingleUnit({
        number: "",
        type: "",
        size: "",
        rent: "",
        status: "",
        images: [],
        features: [],
      });
    } catch (error) {
      setMessage("Error adding unit. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 mb-8">
      <h3 className="text-lg font-semibold">Add Individual Unit</h3>

      {message && (
        <p
          className={`text-sm mt-2 ${
            message.includes("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}

      <input
        type="text"
        placeholder="Unit Number...e.g. A-101"
        value={singleUnit.number}
        onChange={(e) =>
          setSingleUnit({ ...singleUnit, number: e.target.value })
        }
        className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[30%] xl:w-[30%] text-sm p-2 border rounded-md mt-2"
      />
      <br />

      <RentalUnitSelector unitData={singleUnit} setUnitData={setSingleUnit} />

      <input
        type="number"
        placeholder="Rent Price in Ksh."
        value={singleUnit.rent}
        onChange={(e) => setSingleUnit({ ...singleUnit, rent: e.target.value })}
        className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[30%] xl:w-[30%] text-sm p-2 border rounded-md mt-2"
      />
      <br />

      <select
        value={singleUnit.status}
        onChange={(e) =>
          setSingleUnit({ ...singleUnit, status: e.target.value })
        }
        className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[30%] xl:w-[30%] text-sm p-2 border rounded-md mt-2 text-gray-500"
      >
        <option value="" disabled>
          Select Availability Status
        </option>
        <option value="VACANT">Available</option>
        <option value="OCCUPIED">Occupied</option>
      </select>

      <div className="text-gray-500 mt-2">
        <UnitFeatures
          selectedFeatures={
            Array.isArray(singleUnit.features) ? singleUnit.features : []
          } // Ensure array
          setSelectedFeatures={(newFeatures) =>
            setSingleUnit((prev) => ({
              ...prev,
              features: Array.isArray(newFeatures) ? [...newFeatures] : [], // Ensure newFeatures is an array
            }))
          }
        />
      </div>

      <div className="mt-2">
        <ImageUploader
          onImagesUpload={(images) => setSingleUnit({ ...singleUnit, images })}
        />
      </div>

      <a href="/add-building">
        <button className="bg-teal-500 text-white px-4 py-2 rounded-lg mt-4 mr-2">
          Back
        </button>
      </a>

      <button
        onClick={addSingleUnit}
        className="bg-teal-500 text-white px-4 py-2 rounded-lg mt-4 mr-2"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save & Add More"}
      </button>

      <button className="bg-teal-500 text-white px-4 py-2 rounded-lg mt-4">
        Save & Exit
      </button>
    </div>
  );
};

export default SingleEntryForm;
