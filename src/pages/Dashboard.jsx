import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Import Routes & Route
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AddEstate from "./AddEstate";
import AddBuilding from "./AddBuilding";
import AddUnits from "./AddUnits";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="p-4 w-full">
          <Routes>
            <Route path="/add-estate" element={<AddEstate />} />

            <Route path="/add-building" element={<AddBuilding />} />
            <Route path="/add-units" element={<AddUnits />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
