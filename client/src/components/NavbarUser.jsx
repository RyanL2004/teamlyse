import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Bell,
  Settings,
  LogOut,
  MessageSquare,
  Star,
  Moon,
  Sun,
  ChevronDown,
  User,
  CreditCard
} from "lucide-react";
import { UserContext } from "../context/UserContext";

const UserNav = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.user-nav-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleNotificationClick = () => {
    setShowNotificationBadge(false);
    setNotifications(0);
  };

  const handleLogout = () => {
    fetch("/api/users/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        setUser(null);
        navigate("/login");
      })
      .catch((err) => {
        console.error("Error Logging out:", err);
      });
  };

  return (
    <div className="relative user-nav-container">
      <div className="flex items-center space-x-4">
        {/* Notification Bell with hover effect and animation */}
        <button
          onClick={handleNotificationClick}
          className="relative p-2 rounded-full hover:bg-neutral-800 transition-all duration-300 transform hover:scale-110"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Bell className={`h-5 w-5 text-gray-300 transition-transform duration-300 ${isHovering ? 'rotate-12' : ''}`} />
          {showNotificationBadge && notifications > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
              {notifications}
            </span>
          )}
        </button>

        {/* Theme Toggle with smooth transition */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-neutral-800 transition-all duration-300 transform hover:scale-110"
        >
          <div className="relative w-5 h-5">
            <Sun className={`absolute h-5 w-5 text-gray-300 transition-all duration-500 ${isDark ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
            <Moon className={`absolute h-5 w-5 text-gray-300 transition-all duration-500 ${isDark ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'}`} />
          </div>
        </button>

        {/* User Avatar Button with rotation animation */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-2 rounded-full transition-all duration-300 hover:bg-neutral-800"
        >
          <Avatar className="h-9 w-9 ring-2 ring-neutral-700 ring-offset-2 ring-offset-neutral-950 transition-all duration-300 hover:ring-neutral-500">
            <AvatarImage src={user.profilePhoto} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <ChevronDown className={`h-4 w-4 text-gray-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </button>
      </div>

      {/* Dropdown Menu with fade and slide animation */}
      <div className={`absolute right-0 mt-2 w-64 bg-neutral-950 rounded-lg shadow-lg border border-neutral-800 z-50 transition-all duration-300 transform origin-top-right ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        {/* User Info Section */}
        <div className="p-4 border-b border-neutral-800 transition-all duration-300 hover:bg-neutral-900">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.profilePhoto} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-300">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <ul className="py-2">
          <MenuItem
            to="/account"
            icon={<User className="h-4 w-4" />}
            text="Account"
            onClick={() => setIsOpen(false)}
          />
          <MenuItem
            to="/billing"
            icon={<CreditCard className="h-4 w-4" />}
            text="Billing"
            onClick={() => setIsOpen(false)}
          />
          <MenuItem
            to="/notifications"
            icon={<Bell className="h-4 w-4" />}
            text="Notifications"
            badge={notifications > 0 ? notifications : null}
            onClick={() => setIsOpen(false)}
          />
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-neutral-800 transition-all duration-300 flex items-center gap-2 group"
            >
              <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Enhanced MenuItem component with hover animations
const MenuItem = ({ to, icon, text, badge, onClick }) => (
  <li>
    <Link
      to={to}
      className="block px-4 py-2 text-sm text-gray-300 hover:bg-neutral-800 transition-all duration-300 flex items-center justify-between group"
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
        {text}
      </span>
      {badge && (
        <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs animate-pulse">
          {badge}
        </span>
      )}
    </Link>
  </li>
);

export default UserNav;