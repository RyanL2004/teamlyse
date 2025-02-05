import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-neutral-950 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <span className="text-white">Meet</span>
          <span className="text-gray-400">Pet</span>
        </h1>

        {/* Navigation Links */}
        <ul className="flex gap-8 text-sm tracking-wide font-medium">
          <li>
            <Link
              to="/"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/features"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              Features
            </Link>
          </li>
          <li>
            <Link to="dashboard" className="text-white">
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/pricing"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="/support"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              Support
            </Link>
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link to="signin">
          <button className="border border-gray-600 px-4 py-2 rounded-md text-white bg-transparent hover:bg-gray-800 transition-all">
            Login
          </button>
          </Link>
          <Link to="signup">
          <button className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-4 py-2 rounded-md font-semibold hover:from-gray-700 hover:to-gray-500 transition-all">
            Sign Up
          </button>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
