import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaHistory,
  FaRobot,
  FaPaw,
  FaBars,
  FaTimes,
  FaPlusCircle,
  FaUserCircle,
  FaCalendarAlt,
} from "react-icons/fa";

const DashboardSideBar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation(); // Detect current route

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <FaHome /> },
    { to: "/live-meeting", label: "Live Meeting", icon: <FaRobot /> },
    {
      to: "/upcoming-meetings",
      label: "Upcoming Meetings",
      icon: <FaCalendarAlt />,
    },
    { to: "/meetings-history", label: "Meetings History", icon: <FaHistory /> },
    { to: "/live-companion", label: "Live Companion", icon: <FaPaw /> },
  ];

  return (
    <motion.aside
      animate={{ width: isSidebarOpen ? 275 : 77 }}
      className="bg-neutral-950 h-screen p-4 flex flex-col fixed left-0 top-0 transition-all "
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 rounded-lg bg-gray-500 hover:bg-gray-500 transition self-end"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* "New Meeting" Button (ChatGPT Style) */}
      <div className="mt-6">
        <Link
          to="/live-meeting"
          className="flex items-center space-x-3 p-3 bg-gray-800 hover:bg-gray-800 text-white rounded-lg shadow-md transition justify-center"
          onClick={() => setIsSidebarOpen(true)} // Reset sidebar on navigation
        >
          <FaPlusCircle className="text-xl" />
          {isSidebarOpen && <span className="font-semibold">New Meeting</span>}
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 flex flex-col space-y-4">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className={`flex items-center space-x-3 p-3 rounded-lg transition ${
              location.pathname === link.to
                ? "bg-gray-800 text-white"
                : "hover:bg-gray-800 text-white"
            }`}
            onClick={() => setIsSidebarOpen(true)} // Reset sidebar on navigation
          >
            <div className="text-xl">{link.icon}</div>
            {isSidebarOpen && <span>{link.label}</span>}
          </Link>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="mt-auto flex items-center space-x-3 p-3 rounded-lg bg-gray-800 text-white">
        <FaUserCircle className="text-3xl" />
        {isSidebarOpen && (
          <div>
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs text-gray-400">johndoe@example.com</p>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default DashboardSideBar;
