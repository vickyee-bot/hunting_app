import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AddEstate from "./AddEstate";
import AddBuilding from "./AddBuilding";
import AddUnits from "./AddUnits";
import BottomNav from "../components/BottomNav";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handler to process the added estate
  const handleNewEstate = (newEstate) => {
    console.log("New estate added:", newEstate);
    // Update state or perform other actions here
  };

  return (
    <div>
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        <div className="p-4 w-full">
          <Routes>
            <Route
              path="add-estate"
              element={<AddEstate onEstateAdded={handleNewEstate} />}
            />
            <Route path="add-building" element={<AddBuilding />} />
            <Route path="add-units" element={<AddUnits />} />
          </Routes>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
