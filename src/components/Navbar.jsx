import { useState } from "react";
import { Search, Menu, MessageCircle, Bell, User } from "lucide-react";
import logo from "../assets/46-removebg-preview 1.svg";
import Greeting from "./Greeting";

export default function Navbar({ toggleSidebar }) {
  const [search, setSearch] = useState("");

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md p-4 sm:px-6 md:px-8 w-full">
      {/* Left Section: Sidebar Toggle, Logo & Greeting */}
      <div className="flex w-full sm:w-auto items-center space-x-3">
        {/* Sidebar Toggle Button (Only visible on small screens) */}
        <button
          onClick={toggleSidebar}
          className="block sm:hidden p-0.5 rounded-md focus:outline-none"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Logo */}
        <img src={logo} alt="Rentalke Logo" className="w-16 h-16" />

        {/* Greeting (Left-Aligned) */}
        <div className="w-full text-left ml-1 sm:ml-5">
          <Greeting />
          <p className="text-left w-full sm:text-sm md:text-base text-gray-600 max-w-xs sm:whitespace-normal lg:whitespace-nowrap">
            Explore your property's details & activity
          </p>
        </div>
      </div>

      {/* Search Bar (Centered on Small Screens) */}
      <div className="relative w-full flex justify-center mt-3 sm:mt-0">
        <div className="flex items-center border rounded-full overflow-hidden w-60 sm:w-72 md:w-96">
          <input
            type="text"
            placeholder="Search Anything..."
            className="w-full px-4 py-2 text-sm outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-[#5fd3d3] p-2 rounded-r-full">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Right Section: Icons (Hidden on Small Screens) */}
      <div className="hidden sm:flex items-center space-x-4">
        <MessageCircle className="w-6 h-6 text-[#5fd3d3] cursor-pointer" />
        <Bell className="w-6 h-6 text-[#5fd3d3] cursor-pointer" />
        <User className="w-6 h-6 text-[#5fd3d3] cursor-pointer" />
      </div>
    </nav>
  );
}
