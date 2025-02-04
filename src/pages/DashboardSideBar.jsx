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
  FaPlusCircle,
  FaUserCircle,
  FaCalendarAlt,
} from "react-icons/fa";

const DashboardSideBar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation(); // Detect active page

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
      animate={{ width: isSidebarOpen ? 260 : 85 }}
      className={`bg-gray-900 h-screen p-4 flex flex-col fixed left-0 top-0 transition-all border-r border-gray-700`}
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition self-end"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* "New Meeting" Button (ChatGPT Style) */}
      <div className="mt-6">
        <Link
          to="/live-meeting"
          className="flex items-center space-x-3 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition justify-center"
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
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800 text-gray-300"
            }`}
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
