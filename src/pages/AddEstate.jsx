import React, { useState, useEffect } from "react";
import LocationSelector from "../components/LocationSelector";
import EstateFeatures from "../components/EstateFeatures";
import ImageUploader from "../components/ImageUploader";

const AddEstate = ({ onEstateAdded }) => {
  const [estates, setEstates] = useState([]);
  const [estateName, setEstateName] = useState("");
  const [numBuildings, setNumBuildings] = useState("");

  const addEstate = () => {
    if (estateName.trim() !== "") {
      const newEstate = {
        id: estates.length + 1,
        name: estateName,
        buildings: numBuildings,
      };
      const updatedEstates = [...estates, newEstate];
      setEstates(updatedEstates);
      setEstateName("");
      setNumBuildings("");
      onEstateAdded(updatedEstates);
    }
  };

  return (
    <div className="w-full bg-white shadow-md p-6 rounded-md mb-8">
      <div>
        <a href="/add-estate">
          <button className="bg-teal-300 text-white p-0.5 px-2 text-center rounded-md mr-2 hover:bg-teal-600">
            Estate
          </button>
        </a>
        <a href="/add-building">
          <button className="bg-gray-300 text-white text-center rounded-md mr-2 p-0.5 px-2 hover:bg-gray-400">
            Building(s)
          </button>
        </a>
        <a href="/add-units">
          <button className="bg-gray-300 text-white px-2 text-center rounded-md mr-2 p-0.5 hover:bg-gray-400">
            Unit(s)
          </button>
        </a>
      </div>
      <h2 className="text-xl font-bold">Add Estate</h2>
      <p className="text-sm text-gray-600 mb-1.5">
        Add your property easily and manage it effortlessly!
      </p>

      {/* Estate Name & Number of Buildings */}
      <div className="block gap-4 mt-4">
        <div>
          <label className="font-semibold mr-2">Estate Name:</label>
          <input
            type="text"
            value={estateName}
            onChange={(e) => setEstateName(e.target.value)}
            placeholder="Enter estate name..."
            className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[30%] xl:w-[30%] text-sm p-0.5 border rounded-md mr-2 pl-2"
          />
        </div>
        <div className="mt-2">
          <label className="font-semibold mr-2">No. of buildings:</label>
          <input
            type="number"
            value={numBuildings}
            onChange={(e) => setNumBuildings(e.target.value)}
            placeholder="Enter number..."
            className="w-[70%] sm:w-[50%] md:w-[50%] lg:w-[30%] xl:w-[30%] text-sm p-0.5 border rounded-md pl-2"
          />
        </div>
      </div>

      {/* Location Section */}
      <div className="mt-4">
        <LocationSelector />
      </div>

      {/* Features & Description */}
      <div className="block gap-4 mt-4">
        <EstateFeatures />
        <div className="mt-4">
          <label className="font-semibold">Estate Description:</label>
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Describe the estate (e.g., proximity to schools)..."
            rows={3}
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className="mt-4">
        <ImageUploader />
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-300 px-4 py-2 rounded-md"
          onClick={addEstate}
        >
          Save & Exit
        </button>
        <a href="/add-building">
          <button className="bg-teal-300 text-white px-4 py-2 rounded-md hover:bg-teal-600">
            Save & Proceed
          </button>
        </a>
      </div>

      {/* Display added estates
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Estates List</h3>
        <ul>
          {estates.map((estate) => (
            <li key={estate.id} className="border p-2 rounded-md mt-2">
              {estate.name} - {estate.buildings} Buildings
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default AddEstate;
