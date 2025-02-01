import React from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import SignUp from "./SignUp";
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const handleEmailSubmit = () => {
        if (!email){
            setError("Email address is required")
        }

    }
    const handlePasswordSubmit = () => {
        
    }
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212]">
      <div className="bg-white bg-opacity-10 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md 
                      border border-gray-600 border-opacity-50 
                      shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
        
        {/* Title */}
        <h2 className="text-white text-3xl font-bold text-center mb-6">Welcome Back</h2>

        {/* Input Fields */}
        <form>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email address</label>
            <div className="w-full rounded-lg border border-gray-600 transition-all focus-within:border-blue-500 focus-within:shadow-lg">
              <input 
                type="email" 
                className="w-full px-4 py-2 bg-transparent text-white outline-none placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <div className="w-full rounded-lg border border-gray-600 transition-all focus-within:border-blue-500 focus-within:shadow-lg">
              <input 
                type="password" 
                className="w-full px-4 py-2 bg-transparent text-white outline-none placeholder-gray-400"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Sign In Button */}
          
          <button className="w-full bg-gradient-to-r from-gray-500 to-blue-700 hover:from-gray-600 hover:to-blue-800 transition-all text-white py-2 rounded-lg font-semibold shadow-md" >
            Sign In
          </button>
          
        </form>

        {/* Divider */}
        <div className="text-gray-500 text-center my-4">or continue with</div>

        {/* Social Login */}
        <div className="flex justify-center gap-4">
          <button className="bg-white bg-opacity-20 p-2 rounded-lg shadow-md hover:scale-105 transition duration-300">
            <i className="fab fa-google text-white"></i>
          </button>
          <button className="bg-white bg-opacity-20 p-2 rounded-lg shadow-md hover:scale-105 transition duration-300">
            <i className="fab fa-github text-white"></i>
          </button>
        </div>

        {/* Register Link */}
        <p className="text-gray-400 text-center mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline transition duration-300">Sign Up</Link>
        </p>

      </div>
    </div>
  );
};

export default SignIn;
