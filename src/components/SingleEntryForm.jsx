import { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import UnitFeatures from "../components/UnitFeatures";
import RentalUnitSelector from "./RentalUnitSelector";

const SingleEntryForm = () => {
  const [singleUnit, setSingleUnit] = useState({
    number: "",
    type: "",
    size: "",
    rent: "",
    status: "",
  });

  const addSingleUnit = () => {
    console.log("Unit Added:", singleUnit);
    setSingleUnit({ number: "", type: "", size: "", rent: "", status: "" });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 mb-8">
      <h3 className="text-lg font-semibold">Add Individual Unit</h3>
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

      <RentalUnitSelector
        singleUnit={singleUnit}
        setSingleUnit={setSingleUnit}
      />

      <input
        type="text"
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
        <option value="Available">Available</option>
        <option value="Occupied">Occupied</option>
      </select>

      <div className="text-gray-500">
        <UnitFeatures />
      </div>

      <div className="mt-2">
        <ImageUploader />
      </div>

      <a href="/add-building">
        <button className="bg-teal-500 text-white px-4 py-2 rounded-lg mt-4 mr-2">
          Back
        </button>
      </a>

      <button
        onClick={addSingleUnit}
        className="bg-teal-500 text-white px-4 py-2 rounded-lg mt-4 mr-2"
      >
        Save & Add More
      </button>

      <button className="bg-teal-500 text-white px-4 py-2 rounded-lg mt-4">
        Save & exit
      </button>

      {/* Confirm & Publish */}
      <div className="mt-6">
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg w-full">
          Confirm & Publish
        </button>
      </div>
    </div>
  );
};

export default SingleEntryForm;
