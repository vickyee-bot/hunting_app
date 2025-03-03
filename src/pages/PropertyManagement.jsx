import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL =
  "https://rentalke-server-2.onrender.com/api/v1/properties/manager";

const PropertyManagement = () => {
  const [estates, setEstates] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedEstate, setSelectedEstate] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");

  const token = localStorage.getItem("token");

  //

  useEffect(() => {
    const fetchEstates = async () => {
      try {
        const response = await fetch(
          "https://rentalke-server-2.onrender.com/api/v1/properties/manager/estates",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch estates");
        const data = await response.json();

        console.log("Fetched Estates Data:", data);
        setEstates(data.estates);
      } catch (error) {
        console.error("Error fetching estates:", error);
      }
    };
    fetchEstates();
  }, []);

  useEffect(() => {
    if (!selectedEstate) return;

    const fetchBuildings = async () => {
      try {
        const response = await fetch(
          "https://rentalke-server-2.onrender.com/api/v1/properties/manager/buildings",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch buildings");
        const data = await response.json();

        console.log("API Response:", data);
        console.log("Selected Estate ID:", selectedEstate);

        const filteredBuildings = data.buildings.filter((building) => {
          console.log("Building Estate ID:", building.estateId);
          return building.estateId === selectedEstate;
        });

        console.log("Filtered Buildings:", filteredBuildings);
        setBuildings(filteredBuildings);
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };

    fetchBuildings();
  }, [selectedEstate]);

  useEffect(() => {
    if (!selectedBuilding) return;

    const fetchUnits = async () => {
      try {
        const response = await fetch(
          "https://rentalke-server-2.onrender.com/api/v1/properties/manager/rental-units",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch units");
        const data = await response.json();

        console.log("API Response for Units:", data);
        console.log("Selected Building ID:", selectedBuilding);

        // Ensure `rentalUnits` exists in the response
        if (!data || !Array.isArray(data.rentalUnits)) {
          console.error(
            "Invalid data format: rentalUnits is missing or not an array",
            data
          );
          setUnits([]); // Prevents further errors
          return;
        }

        // Filter units based on the selected building
        const filteredUnits = data.rentalUnits.filter(
          (unit) => String(unit.buildingId) === String(selectedBuilding)
        );

        console.log("Filtered Units:", filteredUnits);
        setUnits(filteredUnits);
      } catch (error) {
        console.error("Error fetching units:", error);
        setUnits([]); // Ensure UI doesn't break
      }
    };

    fetchUnits();
  }, [selectedBuilding]);

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-md min-h-screen overflow-hidden mb-10">
      <h1 className="text-2xl font-bold mb-4">Manage Property!</h1>
      <p className="text-gray-600">
        View and manage your property details, buildings, and units.
      </p>

      <div className="flex gap-4 mt-4 items-center">
        {/* <select
          value={selectedEstate}
          onChange={(e) => setSelectedEstate(e.target.value)}
          className="px-4 py-2 text-black font-medium rounded-full border border-black cursor-pointer"
        >
          <option value="">Select Estate</option>
          {Array.isArray(estates) &&
            estates.map((estate, index) => (
              <option key={estate._id || index} value={estate._id}>
                {estate.name}
              </option>
            ))}
        </select> */}

        {/* <select
          value={selectedBuilding}
          onChange={(e) => setSelectedBuilding(e.target.value)}
          className="px-4 py-2 border border-black rounded-full cursor-pointer"
        >
          <option value="">Select Building</option>
          {buildings.map((building, index) => (
            <option key={building._id || index} value={building._id}>
              {building.name}
            </option>
          ))}
        </select> */}

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
        <select
          value={selectedBuilding}
          onChange={(e) => setSelectedBuilding(e.target.value)}
          className="w-1/3 text-sm p-1 border rounded-md text-gray-500"
        >
          <option value="">Select building...</option>
          {buildings.map((building) => (
            <option key={building.id} value={building.id}>
              {building.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Estates</h2>
        <div className="flex gap-4 overflow-x-auto px-4">
          {estates.map((estate, index) => (
            <div
              key={estate._id || index}
              className="p-4 bg-white shadow-md rounded-md min-w-[90%] md:min-w-[48%] lg:min-w-[32%]"
            >
              <img
                src={estate.images[0]}
                alt="estate images"
                className="h-60 w-60"
              />
              <h3 className="text-lg font-semibold">{estate.name}</h3>
              <p className="text-gray-600">Location: {estate.subcounty}</p>
              <p className="text-gray-600">
                Total Buildings: {estate.buildings.length}
              </p>

              {/* <p className="text-gray-600">
                Total Units: {estate.unitCount || "N/A"}
              </p> */}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Buildings</h2>
        <div className="flex gap-4 overflow-x-auto px-4">
          {buildings.map((building, index) => (
            <div
              key={building._id || index}
              className="p-4 bg-white shadow-md rounded-md min-w-[90%] md:min-w-[48%] lg:min-w-[32%]"
            >
              <img src={building.images[0]} alt="building images" />
              <h3 className="text-lg font-semibold">{building.name}</h3>
              <p className="text-gray-600">Floors: {building.noOfFloors}</p>
              <p className="text-gray-600">Units: {building.noOfUnits}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Units</h2>
        <div className="flex gap-4 overflow-x-auto px-4">
          {units.map((unit, index) => (
            <div
              key={unit._id || index}
              className="p-4 bg-white shadow-md rounded-md min-w-[80%] md:min-w-[48%] lg:min-w-[30%]"
            >
              <img src={unit.images[0]} alt="unit images" />
              <h4 className="text-md font-semibold">Unit: {unit.name}</h4>
              <p className="text-gray-600">Type: {unit.unitType}</p>
              <p className="text-gray-600">Size: {unit.unitSize}</p>
              <p className="text-gray-600">Price: KES {unit.unitPrice}</p>
              <p className="text-gray-600">Status {unit.availability}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyManagement;
