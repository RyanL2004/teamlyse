import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaBars, FaTimes } from "react-icons/fa";
import DashboardSideBar from "./DashboardSideBar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex bg-neutral-950 text-white min-h-screen relative">
      {/* Sidebar Component */}
      <DashboardSideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content Adjusting with Sidebar */}
      <main
        className={`flex-1 p-8 transition-all duration-300 ${
          isSidebarOpen ? "ml-[260px]" : "ml-[80px]"
        }`}
      >
        <div>
        <h1 className="text-3xl font-bold right-4">Welcome Back, User!</h1>
        <p className="text-gray-400 mt-2">
          Your AI Meeting Companion is ready.
        </p>
        </div>

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
      </main>
    </div>
  );
};

export default Dashboard;
