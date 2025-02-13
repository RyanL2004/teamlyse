import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5"; // Import icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  return (
    <>
      <nav className="w-full fixed top-0 z-50 bg-gradient-to-b from-black via-black/80 to-transparent text-white backdrop-blur-lg shadow-lg">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto px-6 py-4">

          {/* Logo */}
          <h1 className="text-2xl font-bold tracking-wide">
            <span className="text-white">T&#x39E;AMLYSE</span>
          </h1>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8 text-sm tracking-wide font-medium">
            <li>
              <Link to="/" className="hover:text-gray-300 transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/features" className="hover:text-gray-300 transition duration-300">
                Features
              </Link>
            </li>
            <li>
              <Link to="dashboard" className="hover:text-gray-300 transition duration-300">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-gray-300 transition duration-300">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-gray-300 transition duration-300">
                Support
              </Link>
            </li>
          </ul>

          {/* Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="signin">
              <button className="text-white hover:text-gray-300 transition duration-300">
                Log in
              </button>
            </Link>
            <Link to="signup">
              <button className="bg-white text-black px-5 py-2 rounded-full font-semibold shadow-md hover:bg-gray-300 transition-all">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            className="md:hidden text-white text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </nav>

      {/* 🔥 Fixed Mobile Menu - Now Covers Everything */}
      {isOpen && (
        <div 
          className="fixed inset-0  bg-black text-white flex flex-col items-center justify-center space-y-6 z-50"
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white text-4xl"
            onClick={() => setIsOpen(false)}
          >
            <IoClose />
          </button>

          {/* ✅ All Links are Now Visible & Centered */}
          <Link to="/" className="text-white text-xl hover:text-gray-400" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/features" className="text-white text-xl hover:text-gray-400" onClick={() => setIsOpen(false)}>
            Features
          </Link>
          <Link to="dashboard" className="text-white text-xl hover:text-gray-400" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link to="/pricing" className="text-white text-xl hover:text-gray-400" onClick={() => setIsOpen(false)}>
            Pricing
          </Link>
          <Link to="/support" className="text-white text-xl hover:text-gray-400" onClick={() => setIsOpen(false)}>
            Support
          </Link>

          {/* 🔹 Mobile Buttons - Properly Aligned */}
          <div className="flex items-center gap-5 mt-40">
            <Link to="signin">
              <button className="text-white text-lg hover:text-gray-300 transition duration-300">
                Log in
              </button>
            </Link>
            <Link to="signup">
              <button className="bg-white text-black text-lg px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-200 transition-all">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
