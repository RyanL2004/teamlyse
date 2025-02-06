import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Video, 
  CalendarCheck2, 
  History, 
  Bot, 
  Menu, 
  User
} from "lucide-react";

const DashboardSideBar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation(); // Detects current route

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/live-meeting", label: "Live Meeting", icon: Video },
    { to: "/upcoming-meetings", label: "Upcoming Meetings", icon: CalendarCheck2 },
    { to: "/meetings-history", label: "Meetings History", icon: History },
    { to: "/live-companion", label: "Live Companion", icon: Bot },
  ];

  return (
    <motion.aside
      animate={{ width: isSidebarOpen ? 260 : 80 }}
      className="bg-neutral-950 h-screen p-5 flex flex-col fixed left-0 top border-r border-gray-800 transition-all duration-300 shadow-xl"
    >
      {/* "New Meeting" Button & Sidebar Toggle */}
      <div className="flex justify-between items-center mt-2">
        <Link
          to="/live-meeting"
          className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white rounded-lg shadow-md transition flex-grow justify-center"
        >
          <Video size={22} />
          {isSidebarOpen && <span className="font-semibold">New Meeting</span>}
        </Link>

        {/* Sidebar Toggle Button - Moved to the right of "New Meeting" */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition shadow-md ml-3.5"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 flex flex-col space-y-3 flex-grow">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className={`flex items-center space-x-3 p-3 rounded-lg transition ${
              location.pathname === link.to
                ? "bg-gray-800 text-white"
                : "hover:bg-gray-800 text-gray-300"
            }`}
          >
            <link.icon size={22} />
            {isSidebarOpen && <span>{link.label}</span>}
          </Link>
        ))}
      </nav>

      {/* User Profile Section as a Button */}
      <button className="mt-auto flex items-center space-x-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition w-full">
        <User size={28} />
        {isSidebarOpen && (
          <div>
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs text-gray-400">johndoe@example.com</p>
          </div>
        )}
      </button>
    </motion.aside>
  );
};

export default DashboardSideBar;
