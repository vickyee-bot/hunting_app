import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LocationSelector = () => {
  const [location, setLocation] = useState({ lat: -1.286389, lng: 36.817223 }); // Default: Nairobi
  const [address, setAddress] = useState("");
  const [counties, setCounties] = useState(["Nairobi", "Mombasa", "Kisumu"]);
  const [subCounties, setSubCounties] = useState([]);
  const [locations, setLocations] = useState([]);
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
      setLocation({
        lat: e.target.getLatLng().lat,
        lng: e.target.getLatLng().lng,
      });
    });

    return () => map.remove(); // Cleanup on unmount
  }, []);

  // Handle "Use My Location"
  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
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
      <div className="mt-2 bg-gray-300 h-52 w-full rounded-md">
        <div id="map" className="h-full w-full"></div>
      </div>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-2 mt-2">
        {/* County */}
        <select
          className="p-2 border rounded-md w-full"
          value={selectedCounty}
          onChange={(e) => {
            setSelectedCounty(e.target.value);
            setSubCounties(["Example Sub-County 1", "Example Sub-County 2"]);
          }}
        >
          <option value="">Select County</option>
          {counties.map((county, index) => (
            <option key={index} value={county}>
              {county}
            </option>
          ))}
        </select>

        {/* Sub-County */}
        <select
          className="p-2 border rounded-md w-full"
          value={selectedSubCounty}
          onChange={(e) => {
            setSelectedSubCounty(e.target.value);
            setLocations(["Example Location 1", "Example Location 2"]);
          }}
        >
          <option value="">Select Sub-County</option>
          {subCounties.map((subCounty, index) => (
            <option key={index} value={subCounty}>
              {subCounty}
            </option>
          ))}
        </select>

        {/* Location */}
        <select className="p-2 border rounded-md w-full">
          <option value="">Select Location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LocationSelector;
