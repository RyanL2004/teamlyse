import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaBars, FaTimes } from "react-icons/fa";
import DashboardSideBar from "./DashboardSideBar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex bg-[#121212] text-white min-h-screen">
      {/* Sidebar Component */}
      <DashboardSideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <main
        className={`flex-1 p-8 transition-all ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Sidebar Toggle Button at the Top Right */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-all"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <h1 className="text-3xl font-bold">Welcome Back, User!</h1>
        <p className="text-gray-400 mt-2">
          Your AI Meeting Companion is ready.
        </p>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Link
            to="/live-meeting"
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold">Start AI Meeting</h3>
              <p className="text-gray-200 text-sm">
                Let AI assist you in real time.
              </p>
            </div>
            <FaPlusCircle className="text-3xl" />
          </Link>

          <Link
            to="/meetings-history"
            className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold">View Past Meetings</h3>
              <p className="text-gray-200 text-sm">
                Check AI-generated summaries.
              </p>
            </div>
          </Link>

          <Link
            to="/live-companion"
            className="bg-purple-700 hover:bg-purple-800 text-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold">Customize Companion</h3>
              <p className="text-gray-200 text-sm">Make it truly yours!</p>
            </div>
          </Link>
        </div>
        {/* Recent Meeting Summaries */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Recent Meetings</h2>
          <ul className="mt-4 space-y-3">
            <li className="p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition">
              <Link to="/meetings-history" className="flex justify-between">
                <span>📝 AI Summary for "Team Sync" (Yesterday)</span>
                <span className="text-sm text-gray-300">View →</span>
              </Link>
            </li>
            <li className="p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition">
              <Link to="/meetings-history" className="flex justify-between">
                <span>📝 Key Insights from "Product Roadmap" (Last Week)</span>
                <span className="text-sm text-gray-300">View →</span>
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
