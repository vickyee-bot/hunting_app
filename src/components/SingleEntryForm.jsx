import { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import UnitFeatures from "../components/UnitFeatures";

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

      <select
        value={singleUnit.type}
        onChange={(e) => setSingleUnit({ ...singleUnit, type: e.target.value })}
        className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[30%] xl:w-[30%] text-sm p-2 border rounded-md mt-2 bg-white text-gray-500"
      >
        <option value="" disabled>
          Select Unit Type
        </option>
        <option value="Apartment">Apartment</option>
        <option value="Bungalow">Bungalow</option>
        <option value="Maisonette">Maisonette</option>
        <option value="Townhouse">Townhouse</option>
        <option value="Studio Apartment">Studio Apartment</option>
        <option value="Condominium">Condominium</option>
        <option value="Hostel">Hostel</option>
        <option value="Commercial Space">Commercial Space</option>
        <option value="Serviced Apartment">Serviced Apartment</option>
        <option value="Mixed-Use Development">Mixed-Use Development</option>
      </select>
      <br />

      <select
        value={singleUnit.size}
        onChange={(e) => setSingleUnit({ ...singleUnit, size: e.target.value })}
        className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[30%] xl:w-[30%] text-sm p-2 border rounded-md mt-2 bg-white text-gray-500"
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
        <option value="Under Maintenance">Under Maintenance</option>
        <option value="Reserved">Reserved</option>
        <option value="Pending Approval">Pending Approval</option>
        <option value="Vacating Soon">Vacating Soon</option>
        <option value="Not Available">Not Available</option>
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
