import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Counties from "./Counties.jsx";

const LocationSelector = ({ onLocationSelect }) => {
  const [location, setLocation] = useState({ lat: -1.286389, lng: 36.817223 }); // Default: Nairobi
  const [address, setAddress] = useState("");
  const [counties, setCounties] = useState(["Nairobi", "Mombasa", "Kisumu"]);
  const [subCounties, setSubCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedSubCounty, setSelectedSubCounty] = useState("");

  useEffect(() => {
    const map = L.map("map").setView([location.lat, location.lng], 12);

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Add a draggable marker
    const marker = L.marker([location.lat, location.lng], { draggable: true })
      .addTo(map)
      .bindPopup("Drag to set location")
      .openPopup();

    // Update state when marker is dragged
    marker.on("dragend", function (e) {
      const newLatLng = e.target.getLatLng();
      setLocation({ lat: newLatLng.lat, lng: newLatLng.lng });
      onLocationSelect(
        newLatLng.lat,
        newLatLng.lng,
        selectedCounty,
        selectedSubCounty
      );
    });

    return () => map.remove(); // Cleanup on unmount
  }, [selectedCounty, selectedSubCounty]);

  // Handle "Use My Location"
  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          onLocationSelect(
            newLocation.lat,
            newLocation.lng,
            selectedCounty,
            selectedSubCounty
          );
        },
        () => alert("Location access denied.")
      );
    } else {
      alert("Geolocation is not supported.");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <label className="font-semibold">Location:</label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter address or drag the pin to set location."
          className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[30%] xl:w-[30%] text-sm p-2 border rounded-md"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          className="bg-teal-400 text-white rounded-md p-1 text-sm"
          onClick={fetchUserLocation}
        >
          Use My Location
        </button>
      </div>

      {/* Map Section */}
      <div className="mt-2 bg-gray-300 h-70 w-full rounded-md">
        <div id="map" className="h-full w-full"></div>
      </div>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-2 mt-2">
        <Counties
          onCountySelect={(county, subcounties) => {
            setSelectedCounty(county);
            setSubCounties(subcounties);
            onLocationSelect(
              location.lat,
              location.lng,
              county,
              selectedSubCounty
            );
          }}
          onSubCountySelect={(subcounty) => {
            setSelectedSubCounty(subcounty);
            onLocationSelect(
              location.lat,
              location.lng,
              selectedCounty,
              subcounty
            );
          }}
        />
      </div>
    </div>
  );
};

export default LocationSelector;
