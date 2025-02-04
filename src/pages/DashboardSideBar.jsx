import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaHistory,
  FaRobot,
  FaPaw,
  FaBars,
  FaTimes,
  FaCalendarAlt,
} from "react-icons/fa";

const DashboardSideBar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation(); // Detect current route for active state

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <FaHome /> },
    { to: "/live-meeting", label: "Live Meeting", icon: <FaRobot /> },
    { to: "/upcoming-meetings", label: "Upcoming Meetings", icon: <FaCalendarAlt /> },
    { to: "/meetings-history", label: "Meetings History", icon: <FaHistory /> },
    { to: "/live-companion", label: "Live Companion", icon: <FaPaw /> },
  ];

  return (
    <motion.aside
      animate={{ width: isSidebarOpen ? 250 : 80 }}
      className={`bg-gray-900 h-screen p-4 flex flex-col fixed left-0 top-0 transition-all z-50 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition self-end"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links */}
      <nav className="mt-10 flex flex-col space-y-4">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className={`flex items-center space-x-3 p-3 rounded-lg transition ${
              location.pathname === link.to
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800 text-gray-300"
            }`}
          >
            <div className="text-xl">{link.icon}</div>
            {isSidebarOpen && <span>{link.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Tooltip for Collapsed Sidebar */}
      {!isSidebarOpen && (
        <div className="absolute left-[90px] text-xs text-gray-400">
        </div>
      )}
    </motion.aside>
  );
};

export default DashboardSideBar;
