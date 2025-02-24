import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AddEstate from "./AddEstate";
import AddBuilding from "./AddBuilding";
import AddUnits from "./AddUnits";
import BottomNav from "../components/BottomNav";
import Overview from "../components/Overview";
import Performance from "../components/Performance";

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
            {/* Default dashboard content */}
            <Route
              index
              element={
                <>
                  <Overview />
                  <Performance />
                </>
              }
            />
            <Route path="add-estate" element={<AddEstate />} />
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
