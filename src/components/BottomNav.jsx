import { LayoutGrid, MessageCircle, Bell, User } from "lucide-react";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around items-center py-3 md:hidden mt-5">
      <NavItem
        icon={<LayoutGrid className="w-6 h-6 text-[#5fd3d3]" />}
        label="Dashboard"
      />
      <NavItem
        icon={<MessageCircle className="w-6 h-6 text-[#5fd3d3]" />}
        label="Messages"
      />
      <NavItem
        icon={<Bell className="w-6 h-6 text-[#5fd3d3]" />}
        label="Notifications"
      />
      <NavItem
        icon={<User className="w-6 h-6 text-[#5fd3d3]" />}
        label="Profile"
      />
    </div>
  );
};

// Reusable navigation item
const NavItem = ({ icon, label }) => (
  <div className="flex flex-col items-center cursor-pointer">
    {icon}
    <span className="text-xs text-gray-600">{label}</span>
  </div>
);

export default BottomNav;
