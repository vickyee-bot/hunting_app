import { useState } from "react";
import { Search, Menu, MessageCircle, Bell, User } from "lucide-react";
import logo from "../assets/logo1-removebg-preview.png";

export default function Navbar({ toggleSidebar }) {
  const [search, setSearch] = useState("");

  return (
    <nav className="flex items-center justify-between bg-white shadow-md p-4 md:px-8 w-full">
      {/* Left Section: Sidebar Toggle, Logo & Greeting */}
      <div className="flex items-center space-x-3">
        {/* Sidebar Toggle Button (Only visible on small screens) */}
        <button
          onClick={toggleSidebar}
          className="block md:hidden p-2 rounded-md focus:outline-none"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Logo */}
        <img src={logo} alt="Rentalke Logo" className="w-10 h-10" />

        {/* Greeting */}
        <div>
          <h1 className="text-lg font-semibold">Hello John!</h1>
          <p className="text-sm text-gray-600">
            Explore information and activity about your property
          </p>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="relative flex items-center border rounded-full overflow-hidden w-48 md:w-64 lg:w-96">
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

      {/* Right Section: Icons (Hidden on small screens) */}
      <div className="hidden md:flex items-center space-x-4">
        <MessageCircle className="w-6 h-6 text-[#5fd3d3] cursor-pointer" />
        <Bell className="w-6 h-6 text-[#5fd3d3] cursor-pointer" />
        <User className="w-6 h-6 text-[#5fd3d3] cursor-pointer" />
      </div>
    </nav>
  );
}
