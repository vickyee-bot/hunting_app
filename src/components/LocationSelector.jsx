import React from "react";

const LocationSelector = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <label className="font-semibold">Location:</label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter address or drag the pin to set location."
          className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[30%] xl:w-[30%] text-sm p-2 border rounded-md"
        />
        <button className="bg-teal-400 text-white rounded-md p-1 text-sm">
          Use My Location
        </button>
      </div>
      <div className="mt-2 bg-gray-300 h-52 w-full rounded-md flex items-center justify-center">
        {/* Placeholder for map */}
        <span className="text-gray-600">Map Placeholder</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2">
        <select className="p-2 border rounded-md w-full">
          <option>County</option>
        </select>
        <select className="p-2 border rounded-md w-full">
          <option>Sub-County</option>
        </select>
        <select className="p-2 border rounded-md w-full">
          <option>Location</option>
        </select>
      </div>
    </div>
  );
};

export default LocationSelector;
