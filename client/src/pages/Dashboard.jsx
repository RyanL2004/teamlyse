import React from "react";
import { motion } from "framer-motion";
import { useSidebar } from "../context/SidebarContext"; // Sidebar state
import { FaPlayCircle, FaChartBar, FaHistory } from "react-icons/fa";
import  Page  from "../app/dashboard/page";
const Dashboard = () => {
  

  return (
    <div className="flex bg-neutral-950 text-white min-h-screen">
      {/* Sidebar */}
      <Page />
      
    </div>
  );
};

export default Dashboard;
