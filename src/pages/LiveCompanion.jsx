import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaHistory, FaRobot, FaPaw, FaBars, FaTimes } from "react-icons/fa";
import DashboardSideBar from './DashboardSideBar';
const LiveCompanion = ({ onSelectPet }) => {
    const [selectedPet, setSelectedPet] = useState(null);
    const [pets, setPets] =  useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

useEffect(() => {
    fetch('/api/pets/all')
    .then((res)=> res.json())
    .then((data) => setPets(data))
    .catch((error) => console.error('Error fetching pets', error))
})

const handleSelect = (pet) => {
    setSelectedPet(pet);
    // Pass seleted pet to Parent component
    onSelectPet(pet); 

};

return (
    <div className="flex h-screen bg-[#121212] text-white">
      {/* Sidebar */}
      <DashboardSideBar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <p className="text-gray-400 mt-2">Manage your AI meeting assistant and track your interactions.</p>

        {/* Placeholder for actual dashboard content */}
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">🚀 Upcoming Features</h2>
          <p className="text-gray-400 mt-2">
            This section will show **Live AI Meetings, Past Meeting Analytics, and Companion Customization**.
          </p>
        </div>
      </main>
    </div>
  );
};

export default LiveCompanion;
