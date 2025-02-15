import { useState } from "react";
import countiesData from "../../kenya-counties-subcounties/counties.json"; // Update with correct path

const LocationSelector = () => {
  const [selectedCounty, setSelectedCounty] = useState("");
  const [subCounties, setSubCounties] = useState([]);
  const [selectedSubCounty, setSelectedSubCounty] = useState("");
  const [locations, setLocations] = useState([]); // Placeholder for future location data

  const handleCountyChange = (e) => {
    const countyName = e.target.value;
    setSelectedCounty(countyName);

    // Find the selected county
    const county = countiesData.find((c) => c.name === countyName);

    // Set sub-counties
    setSubCounties(county ? county.sub_counties : []);
    setSelectedSubCounty(""); // Reset sub-county when county changes
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-2 mt-2">
      {/* County */}
      <select
        className="p-2 border rounded-md w-full"
        value={selectedCounty}
        onChange={handleCountyChange}
      >
        <option value="">Select County</option>
        {countiesData.map((county) => (
          <option key={county.code} value={county.name}>
            {county.name}
          </option>
        ))}
      </select>

      {/* Sub-County */}
      <select
        className="p-2 border rounded-md w-full"
        value={selectedSubCounty}
        onChange={(e) => setSelectedSubCounty(e.target.value)}
        disabled={!subCounties.length}
      >
        <option value="">Select Sub-County</option>
        {subCounties.map((subCounty, index) => (
          <option key={index} value={subCounty}>
            {subCounty}
          </option>
        ))}
      </select>

      {/* Location
      <select className="p-2 border rounded-md w-full" disabled>
        <option value="">Select Location (Not Implemented)</option>
      </select> */}
    </div>
  );
};

export default LocationSelector;
