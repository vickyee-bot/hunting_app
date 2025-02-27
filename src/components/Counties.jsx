import { useState } from "react";
import countiesData from "../data/counties.json"; // Ensure correct path

const Counties = ({ onCountySelect, onSubCountySelect }) => {
  const [selectedCounty, setSelectedCounty] = useState("");
  const [subCounties, setSubCounties] = useState([]);
  const [selectedSubCounty, setSelectedSubCounty] = useState("");

  const handleCountyChange = (e) => {
    const countyName = e.target.value;
    setSelectedCounty(countyName);

    // Find the selected county
    const county = countiesData.find((c) => c.name === countyName);

    // Set sub-counties
    const newSubCounties = county ? county.sub_counties : [];
    setSubCounties(newSubCounties);
    setSelectedSubCounty(""); // Reset sub-county when county changes

    // Send updated data to the parent
    onCountySelect(countyName, newSubCounties);
  };

  const handleSubCountyChange = (e) => {
    const subCountyName = e.target.value;
    setSelectedSubCounty(subCountyName);

    // Send updated data to the parent
    onSubCountySelect(subCountyName);
  };

  return (
    <div className="grid grid-cols-1 gap-2 mt-2">
      {/* County Dropdown */}
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

      {/* Sub-County Dropdown */}
      <select
        className="p-2 border rounded-md w-full"
        value={selectedSubCounty}
        onChange={handleSubCountyChange}
        disabled={!subCounties.length}
      >
        <option value="">Select Sub-County</option>
        {subCounties.map((subCounty, index) => (
          <option key={index} value={subCounty}>
            {subCounty}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Counties;
