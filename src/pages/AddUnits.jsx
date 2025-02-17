import { useState } from "react";
import MultipleEntryForm from "../components/MultipleEntryForm";
import SingleEntryForm from "../components/SingleEntryForm";

const AddUnits = () => {
  const [entryMode, setEntryMode] = useState("multiple"); // "multiple" or "single"

  return (
    <div className="w-[100%] p-1 bg-gray-100 rounded-lg shadow-lg mb-10 sm:w-full sm:p-0">
      {/* Navigation Tabs */}
      <div>
        <a href="/add-estate">
          <button className="bg-gray-300 text-white p-0.5 px-2 text-center rounded-md mr-2 hover:bg-gray-400">
            Estate
          </button>
        </a>
        <a href="/add-building">
          <button className="bg-gray-300 text-white text-center rounded-md mr-2 p-0.5 px-2 hover:bg-gray-400">
            Building(s)
          </button>
        </a>
        <a href="/add-units">
          <button className="bg-teal-300 text-white px-2 text-center rounded-md mr-2 p-0.5">
            Unit(s)
          </button>
        </a>
      </div>
      <h2 className="text-2xl font-bold mb-4">Add Units</h2>

      {/* Choose Estate */}
      <div className="mb-2">
        <label className="block font-medium">Choose Estate:</label>
        <select className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[30%] xl:w-[30%] text-sm p-0.5 border-1 rounded-md mr-2 pl-2 text-gray-500 ">
          <option value="">Select estate...</option>
          {/* Dynamically add options here */}
        </select>
      </div>

      {/* Choose building */}
      <div className="mb-4">
        <label className="block font-medium">Choose Estate:</label>
        <select className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[30%] xl:w-[30%] text-sm p-0.5 border-1 rounded-md mr-2 pl-2 text-gray-500 ">
          <option value="">Select building...</option>
          {/* Dynamically add options here */}
        </select>
      </div>

      {/* Mode Selection */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg transition ${
            entryMode === "multiple" ? "bg-teal-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setEntryMode("multiple")}
        >
          Multiple Entry
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition ${
            entryMode === "single" ? "bg-teal-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setEntryMode("single")}
        >
          Single Entry
        </button>
      </div>

      {/* Render Forms */}
      {entryMode === "multiple" ? <MultipleEntryForm /> : <SingleEntryForm />}
    </div>
  );
};

export default AddUnits;
