import { useState } from "react";
import { Search, MessageCircle, Bell, User } from "lucide-react";
import logo from "../assets/logo1-removebg-preview.png";

export default function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <nav className="flex items-center justify-between bg-white shadow-md p-4 md:px-8 w-full">
      {/* Left Section: Logo & Greeting */}
      <div className="flex items-center space-x-6">
        <img
          src={logo} // Replace with your actual logo path
          alt="Rentalke Logo"
          className="w-14 h-14"
        />
        <div>
          <h1 className="text-lg font-semibold ml-5">Hello John!</h1>
          <p className="text-sm text-gray-600 ml-5">
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

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-4">
        <MessageCircle className="w-6 h-6 text-[#5fd3d3] cursor-pointer" />
        <Bell className="w-6 h-6 text-[#5fd3d3] cursor-pointer" />
        <User className="w-6 h-6 text-[#5fd3d3] cursor-pointer" />
      </div>
    </nav>
  );
}
