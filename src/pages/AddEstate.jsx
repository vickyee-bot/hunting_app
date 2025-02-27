import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LocationSelector from "../components/LocationSelector";
import EstateFeatures from "../components/EstateFeatures";
import ImageUploader from "../components/ImageUploader";
import { useNavigate } from "react-router-dom";

const AddEstate = ({ onEstateAdded }) => {
  const [estateName, setEstateName] = useState("");
  const [numBuildings, setNumBuildings] = useState("");
  const [county, setCounty] = useState("");
  const [subcounty, setSubcounty] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [estateFeatures, setEstateFeatures] = useState([]);
  const [customFeatures, setCustomFeatures] = useState([]);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  // Function to handle estate creation
  const addEstate = async (action) => {
    if (estateName.trim() === "" || numBuildings.trim() === "") {
      alert("Please fill in all required fields.");
      return;
    }

    const newEstate = {
      name: estateName,
      noOfBuildings: Number(numBuildings),
      latitude,
      longitude,
      county,
      subcounty,
      estateFeatures,
      customFeatures,
      description,
      images,
    };

    try {
      const response = await fetch(
        "https://rentalke-server-2.onrender.com/api/v1/properties/manager/estate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(newEstate),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Estate created successfully!");
        onEstateAdded(data.estate);

        // Reset form
        setEstateName("");
        setNumBuildings("");
        setCounty("");
        setSubcounty("");
        setLatitude(null);
        setLongitude(null);
        setEstateFeatures([]);
        setCustomFeatures([]);
        setDescription("");
        setImages([]);

        // ✅ Handle navigation based on action
        if (action === "proceed") {
          navigate("/add-building");
        }
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Failed to create estate:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full bg-white shadow-md p-6 rounded-md mb-8">
      <div>
        <a href="/add-estate">
          <button className="bg-teal-300 text-white p-0.5 px-2 text-center rounded-md mr-2 hover:bg-teal-400">
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
            className="w-[80%] text-sm p-0.5 border rounded-md pl-2"
          />
        </div>
        <div className="mt-2">
          <label className="font-semibold mr-2">No. of buildings:</label>
          <input
            type="number"
            value={numBuildings}
            onChange={(e) => setNumBuildings(e.target.value)}
            placeholder="Enter number..."
            className="w-[70%] text-sm p-0.5 border rounded-md pl-2"
          />
        </div>
      </div>

      {/* Location Section */}
      <div className="mt-4">
        <LocationSelector
          onLocationSelect={(lat, lng, selectedCounty, selectedSubcounty) => {
            setLatitude(lat);
            setLongitude(lng);
            setCounty(selectedCounty);
            setSubcounty(selectedSubcounty);
          }}
        />
      </div>

      {/* Features & Description */}
      <div className="block gap-4 mt-4">
        <EstateFeatures onFeaturesSelect={setEstateFeatures} />
        <div className="mt-4">
          <label className="font-semibold">Estate Description:</label>
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Describe the estate (e.g., proximity to schools)..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className="mt-4">
        <ImageUploader onImagesUpload={setImages} />
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-300 px-4 py-2 rounded-md"
          onClick={() => addEstate("exit")}
        >
          Save & Exit
        </button>
        <button
          className="bg-teal-300 text-white px-4 py-2 rounded-md hover:bg-teal-600"
          onClick={() => addEstate("proceed")}
        >
          Save & Proceed
        </button>
      </div>
      <div className="items-center">
        <button
          className="bg-gray-300 px-4 py-2 rounded-md mt-5"
          onClick={() => addEstate("addAnother")}
        >
          Save & Add Another Estate
        </button>
      </div>
    </div>
  );
};

export default AddEstate;
