import React from "react";
import { motion } from "framer-motion";
import { useSidebar } from "../context/SidebarContext";
import { FaPlayCircle, FaChartBar, FaHistory } from "react-icons/fa";
import DashboardSideBar from "./DashboardSideBar";

// Dashboard Animation
const dashboardVariants = {
  open: { marginLeft: "260px", opacity: 1, transition: { duration: 0.3 } },
  closed: { marginLeft: "80px", opacity: 0.8, transition: { duration: 0.3 } },
};

const Dashboard = () => {
  const { isSidebarOpen } = useSidebar(); // Sidebar State

  return (
    <div className="flex bg-neutral-950 text-white min-h-screen">
      {/* Sidebar */}
      <DashboardSideBar />

      {/* Main Content - Animates dynamically based on sidebar state */}
      <motion.main
        variants={dashboardVariants}
        animate={isSidebarOpen ? "open" : "closed"}
        className="p-8 transition-all duration-300 flex-1"
      >
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome Back, User!</h1>
          <p className="text-gray-400">Your AI Meeting Companion is ready.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Start AI Meeting */}
          <motion.div
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow-md flex items-center justify-between cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div>
              <h3 className="text-xl font-semibold">Start AI Meeting</h3>
              <p className="text-gray-200 text-sm">Let AI assist you in real-time.</p>
            </div>
            <FaPlayCircle className="text-3xl" />
          </motion.div>

          {/* Past Meetings */}
          <motion.div
            className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg shadow-md flex items-center justify-between cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div>
              <h3 className="text-xl font-semibold">Past Meetings</h3>
              <p className="text-gray-200 text-sm">Check AI-generated summaries.</p>
            </div>
            <FaHistory className="text-3xl" />
          </motion.div>

          {/* Meeting Analytics */}
          <motion.div
            className="bg-purple-700 hover:bg-purple-800 text-white p-6 rounded-lg shadow-md flex items-center justify-between cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div>
              <h3 className="text-xl font-semibold">Meeting Analytics</h3>
              <p className="text-gray-200 text-sm">See insights & AI analysis.</p>
            </div>
            <FaChartBar className="text-3xl" />
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default Dashboard;
