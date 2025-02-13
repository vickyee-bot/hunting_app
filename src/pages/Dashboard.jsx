import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Import Routes & Route
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AddEstate from "./AddEstate";
import AddBuilding from "./AddBuilding";
import AddUnits from "./AddUnits";
import BottomNav from "../components/BottomNav";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
            <Route path="/add-estate" element={<AddEstate />} />

            <Route path="/add-building" element={<AddBuilding />} />
            <Route path="/add-units" element={<AddUnits />} />
          </Routes>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
