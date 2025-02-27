import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import BuildingFeatures from "../components/EstateFeatures";

const AddBuilding = () => {
  const navigate = useNavigate();
  const [estates, setEstates] = useState([]);
  const [selectedEstate, setSelectedEstate] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [numFloors, setNumFloors] = useState("");
  const [numUnits, setNumUnits] = useState("");
  const [buildingFeatures, setBuildingFeatures] = useState([
    "Parking",
    "Elevator",
    "Rooftop access",
    "CCTV",
  ]);
  const [customFeatures, setCustomFeatures] = useState([]);
  const [images, setImages] = useState([]);
  const token = localStorage.getItem("token");

  console.log(token);

  useEffect(() => {
    // Fetch estates managed by the authenticated manager
    const fetchEstates = async () => {
      try {
        const response = await fetch(
          "https://rentalke-server-2.onrender.com/api/v1/properties/manager/estates",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setEstates(data.estates);
        } else {
          console.error("Failed to fetch estates", data.message);
        }
      } catch (error) {
        console.error("Error fetching estates:", error);
      }
    };
    fetchEstates();
  }, [token]);

  const handleAddBuilding = async (action) => {
    if (!selectedEstate || !buildingName || !numFloors || !numUnits) {
      alert("Please fill in all required fields.");
      return;
    }

    const newBuilding = {
      estateId: selectedEstate,
      name: buildingName,
      noOfFloors: Number(numFloors),
      noOfUnits: Number(numUnits),
      buildingFeatures,
      customFeatures,
      images,
    };

    try {
      const response = await fetch(
        "https://rentalke-server-2.onrender.com/api/v1/properties/manager/building",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newBuilding),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Building created successfully!");
        setBuildingName("");
        setNumFloors("");
        setNumUnits("");
        setBuildingFeatures(["Parking", "Elevator", "Rooftop access", "CCTV"]);
        setCustomFeatures([]);
        setImages([]);

        if (action === "proceed") navigate("/add-units");
        if (action === "addAnother") setSelectedEstate("");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating building:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
      <div>
        <a href="/add-estate">
          <button className="bg-gray-300 text-white p-0.5 px-2 text-center rounded-md mr-2 hover:bg-gray-400">
            Estate
          </button>
        </a>
        <a href="/add-building">
          <button className="bg-teal-300 text-white text-center rounded-md mr-2 p-0.5 px-2 hover:bg-teal-400">
            Building(s)
          </button>
        </a>
        <a href="/add-units">
          <button className="bg-gray-300 text-white px-2 text-center rounded-md mr-2 p-0.5 hover:bg-gray-400">
            Unit(s)
          </button>
        </a>
      </div>
      <h2 className="text-xl font-bold">Add Building</h2>
      <div className="mt-4 space-y-4">
        {/* Choose Estate */}
        <div>
          <label className="block font-medium">Choose Estate:</label>
          <select
            value={selectedEstate}
            onChange={(e) => setSelectedEstate(e.target.value)}
            className="w-1/3 text-sm p-1 border rounded-md text-gray-500"
          >
            <option value="">Select estate...</option>
            {estates.map((estate) => (
              <option key={estate.id} value={estate.id}>
                {estate.name}
              </option>
            ))}
          </select>
        </div>

        {/* Building Name */}
        <div>
          <label className="block font-medium">Building Name:</label>
          <input
            type="text"
            value={buildingName}
            onChange={(e) => setBuildingName(e.target.value)}
            placeholder="Enter building name..."
            className="w-1/3 text-sm p-1 border rounded-md"
          />
        </div>

        {/* No. of Floors */}
        <div>
          <label className="block font-medium">No. of floors:</label>
          <input
            type="number"
            value={numFloors}
            onChange={(e) => setNumFloors(e.target.value)}
            placeholder="Enter number..."
            className="w-1/3 text-sm p-1 border rounded-md"
          />
        </div>

        {/* No. of Units */}
        <div>
          <label className="block font-medium">No. of Units:</label>
          <input
            type="number"
            value={numUnits}
            onChange={(e) => setNumUnits(e.target.value)}
            placeholder="Enter number..."
            className="w-1/3 text-sm p-1 border rounded-md"
          />
        </div>

        <BuildingFeatures />
        <ImageUploader setImages={setImages} />

        {/* Buttons */}
        <div className="flex flex-wrap justify-between mt-6">
          <button
            onClick={() => navigate("/add-estate")}
            className="bg-teal-300 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
          >
            Back
          </button>
          <button
            onClick={() => handleAddBuilding("exit")}
            className="bg-teal-300 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
          >
            Save & Exit
          </button>
          <button
            onClick={() => handleAddBuilding("addAnother")}
            className="bg-teal-300 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
          >
            Save & Add Another Building
          </button>
          <button
            onClick={() => handleAddBuilding("/add-units")}
            className="bg-teal-300 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
          >
            Save & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBuilding;
