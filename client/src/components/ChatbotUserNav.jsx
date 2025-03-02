//Here we will handle the logic to go back to dahsboard to go back home directly and to access compagnions menu Items

import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faUser,
  faBell,
  faCreditCard,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserContext";
import { useAuth } from "../hooks/useAuth";
import "../pages/ChatbotUI.css";
import { useNavigate } from "react-router-dom";
const ChatNavUser = ({ notifications = 3 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  console.log("ChatNavUser -Current user:", user);
  //Add logout fetch api
  const handleLogout = () => {
    // In your component
    logout();
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".settings-dropdown")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="settings-dropdown">
      <div
        className="left-0 ml-2.5 w-56 bg-black rounded-lg shadow-lg border border-gray-100 z-50"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* User Info Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-gray-700">My Account</div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <MenuItem icon={faUser} text="Profile" />
          <MenuItem icon={faBell} text="Notifications" badge={notifications} />
          <MenuItem icon={faCreditCard} text="Billing" />
          <MenuItem
            icon={faRightFromBracket}
            text="Log out"
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600"
          />
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, text, badge, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors ${className}`}
  >
    <FontAwesomeIcon icon={icon} className="w-4 h-4" />
    <span>{text}</span>
    {badge && (
      <span className="ml-auto bg-primary-color text-white text-xs px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

export default ChatNavUser;
