import { useState } from "react";
import {
  LayoutGrid,
  Home,
  Users,
  DollarSign,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import user from "../assets/user.svg";

const Sidebar = () => {
  const [propertyOpen, setPropertyOpen] = useState(false);
  const [tenantsOpen, setTenantsOpen] = useState(false);

  return (
    <div className="min-h-150 w-64 bg-white p-5 flex flex-col justify-between shadow-lg">
      {/* Main Navigation */}
      <div>
        <div className="space-y-4">
          {/* Dashboard */}
          <NavItem
            icon={<LayoutGrid className="text-[#5fd3d3]" />}
            label="Dashboard"
          />

          {/* My Property Dropdown */}
          <Dropdown
            icon={<Home className="text-[#5fd3d3]" />}
            label="My Property"
            open={propertyOpen}
            setOpen={setPropertyOpen}
            items={[
              <a href="/add-estate" className="block hover:bg-gray-100">
                Add Property
              </a>,
              <a href="/manage-property" className="block hover:bg-gray-100">
                Manage Property
              </a>,
            ]}
          />

          {/* Tenants Dropdown */}
          <Dropdown
            icon={<Users className="text-[#5fd3d3]" />}
            label="Tenants"
            open={tenantsOpen}
            setOpen={setTenantsOpen}
            items={["Details", "Communication"]}
          />

          {/* Other Links */}
          <NavItem
            icon={<DollarSign className="text-[#5fd3d3]" />}
            label="Rent Tracking"
          />
          <NavItem
            icon={<MessageSquare className="text-[#5fd3d3]" />}
            label="Messaging"
          />
          <NavItem
            icon={<Settings className="text-[#5fd3d3]" />}
            label="Account"
          />
          <NavItem
            icon={<HelpCircle className="text-[#5fd3d3]" />}
            label="Help"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-3">
        {/* Logout */}
        <NavItem
          icon={<LogOut className="text-red-500" />}
          label="Logout"
          textColor="text-red-500"
        />

        {/* Profile */}
        <div className="flex items-center gap-2">
          <img
            src={user} // Replace with real image
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">John</span>
        </div>
      </div>
    </div>
  );
};

/* ---------- Helper Components ---------- */

// Simple Navigation Item
const NavItem = ({ icon, label, textColor = "text-gray-900" }) => (
  <div
    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-200 ${textColor}`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

// Dropdown Component
const Dropdown = ({ icon, label, open, setOpen, items }) => (
  <div>
    <div
      className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-200"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <ChevronDown
        className={`transition-transform ${open ? "rotate-180" : ""}`}
      />
    </div>

    {open && (
      <div className="ml-10 space-y-1 text-gray-700">
        {items.map((item, index) => (
          <p key={index} className="cursor-pointer hover:text-gray-900">
            {item}
          </p>
        ))}
      </div>
    )}
  </div>
);

export default Sidebar;
