import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext"; // Sidebar Context
import { LayoutDashboard, Video, CalendarCheck2, History, Bot, Menu } from "lucide-react";

// Sidebar animation variants
const sidebarVariants = {
  open: { width: 260, opacity: 1, transition: { duration: 0.3 } },
  closed: { width: 80, opacity: 1, transition: { duration: 0.3 } },
};

// Navigation item animation
const navItemVariants = {
  open: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  closed: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

const DashboardSideBar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar(); // Sidebar state

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/live-meeting", label: "Live Meeting", icon: Video },
    { to: "/upcoming-meetings", label: "Upcoming Meetings", icon: CalendarCheck2 },
    { to: "/meetings-history", label: "Meetings History", icon: History },
    { to: "/live-companion", label: "Live Companion", icon: Bot },
  ];

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={isSidebarOpen ? "open" : "closed"}
      className="bg-neutral-950 h-screen p-5 flex flex-col fixed left-0 top-0 border-r border-gray-800 transition-all duration-300 shadow-xl"
    >
      {/* Sidebar Toggle Button */}
      <motion.button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition shadow-md flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
      >
        <Menu size={22} />
      </motion.button>

      {/* Navigation Links */}
      <nav className="mt-6 flex flex-col space-y-3">
        {navLinks.map((link, index) => (
          <motion.div
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-lg transition ${
              isSidebarOpen ? "justify-start" : "justify-center"
            } hover:bg-gray-800 text-gray-300 cursor-pointer`}
            variants={navItemVariants}
            animate={isSidebarOpen ? "open" : "closed"}
          >
            <link.icon size={22} />
            {isSidebarOpen && <span>{link.label}</span>}
          </motion.div>
        ))}
      </nav>
    </motion.aside>
  );
};

export default DashboardSideBar;
