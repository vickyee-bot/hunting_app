import { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import UnitFeatures from "./UnitFeatures";

const MultipleEntryForm = () => {
  const [unitCount, setUnitCount] = useState();
  const [units, setUnits] = useState([]);
  const [multipleUnit, setMultipleUnit] = useState({
    number: "",
    type: "",
    size: "",
    rent: "",
    status: "",
  });

  const generateUnits = () => {
    const newUnits = Array.from({ length: unitCount }, (_, index) => ({
      number: `Unit ${index + 1}`,
      type: "",
      size: "",
      rent: "",
      status: "",
    }));
    setUnits(newUnits);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md sm:w-full">
      <p className="text-sm text-gray-600 mb-2">
        (Recommended for large buildings with similar units)
      </p>
      <div className="space-y-3">
        <input
          type="number"
          className="w-[30%] sm:w-full p-2 border rounded"
          placeholder="Enter the number of units..."
          value={unitCount}
          onChange={(e) => setUnitCount(e.target.value)}
        />
        <br />
        <select
          value={multipleUnit.type}
          onChange={(e) =>
            setMultipleUnit({ ...multipleUnit, type: e.target.value })
          }
          className="w-[30%] p-2 border rounded-md mt-2 bg-white text-gray-500"
        >
          <option value="" disabled>
            Select Unit's Type
          </option>
          <option value="Apartment">Apartment</option>
          <option value="Bungalow">Bungalow</option>
          <option value="Maisonette">Maisonette</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Studio Apartment">Studio Apartment</option>
          <option value="Condominium">Condo</option>
          <option value="Hostel">Hostel</option>
          <option value="Commercial Space">Commercial Space</option>
          <option value="Serviced Apartment">Serviced Apartment</option>
          <option value="Mixed-Use Development">Mixed-Use Development</option>
        </select>
        <br />

        <select
          value={multipleUnit.size}
          onChange={(e) =>
            setMultipleUnit({ ...multipleUnit, size: e.target.value })
          }
          className="w-[30%] p-2 border rounded-md mt-2 bg-white text-gray-500"
        >
          <option value="" disabled>
            Select Unit Size
          </option>
          <option value="Single Room">Single Room</option>
          <option value="Bedsitter">Bedsitter</option>
          <option value="One Bedroom">One Bedroom</option>
          <option value="Two Bedroom">Two Bedroom</option>
          <option value="Three Bedroom">Three Bedroom</option>
          <option value="Four Bedroom">Four Bedroom</option>
          <option value="Five Bedroom">Five Bedroom</option>
          <option value="5+ Bedrooms">5+ Bedrooms</option>
        </select>
        <br />
        <input
          type="text"
          placeholder="Rent Price in Ksh."
          value={multipleUnit.rent}
          onChange={(e) =>
            setMultipleUnit({ ...multipleUnit, rent: e.target.value })
          }
          className="w-[30%] p-2 border rounded-md mt-2"
        />
        <br />

        <select
          value={multipleUnit.status}
          onChange={(e) =>
            setMultipleUnit({ ...multipleUnit, status: e.target.value })
          }
          className="w-[30%] p-2 border rounded-md mt-2 text-gray-500"
        >
          <option value="" disabled>
            Select Availability Status
          </option>
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Under Maintenance">Under Maintenance</option>
          <option value="Reserved">Reserved</option>
          <option value="Pending Approval">Pending Approval</option>
          <option value="Vacating Soon">Vacating Soon</option>
          <option value="Not Available">Not Available</option>
        </select>

        <div className="text-gray-500">
          {" "}
          <UnitFeatures />
        </div>

        <div className="w-[50%]">
          <ImageUploader />
        </div>
      </div>
      <button
        onClick={generateUnits}
        className="bg-teal-500 text-white px-4 py-2 rounded-lg w-full mt-4"
      >
        Generate Units
      </button>
      <a href="/add-building">
        <button className="bg-teal-500 text-white px-4 py-2 rounded-lg mt-4 mr-2">
          Back
        </button>
      </a>

      <button className="bg-teal-500 text-white px-4 py-2 rounded-lg mt-4">
        Save & exit
      </button>

      {/* Render Generated Units */}
      {units.map((unit, index) => (
        <div key={index} className="border p-4 mt-4 rounded-lg bg-gray-50">
          <p className="font-semibold">Unit {index + 1}</p>
          <input
            type="text"
            placeholder={multipleUnit.type}
            className="w-full p-2 border rounded-md mt-2"
          />
          <input
            type="text"
            placeholder="Unit Size"
            className="w-full p-2 border rounded-md mt-2"
          />
          <input
            type="text"
            placeholder="Rent Price"
            className="w-full p-2 border rounded-md mt-2"
          />
          <input
            type="text"
            placeholder="Availability Status"
            className="w-full p-2 border rounded-md mt-2"
          />
        </div>
      ))}
      {/* Confirm & Publish */}
      <div className="mt-6">
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg w-full">
          Confirm & Publish
        </button>
      </div>
    </div>
  );
};

export default MultipleEntryForm;
