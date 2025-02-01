import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter password

  // Email validation function
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email); // Simple regex check for valid email format
  };

  // Handle Email Submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email address is required.");
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError(""); // Clear errors
      setStep(2); // Move to password step
    }
  };

  // Handle Password Submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required.");
    } else {
      setError(""); // Clear errors
      console.log("User Signed Up:", { email, password });
      // Proceed to the next step (e.g., navigate to dashboard)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212]">
      <div className="bg-white bg-opacity-10 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md 
                      border border-gray-600 border-opacity-50 
                      shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]">
        
        {/* Title */}
        <h2 className="text-white text-3xl font-bold text-center mb-6">Create an account</h2>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Email address</label>
              <div className={`w-full rounded-lg border ${error ? "border-red-500" : "border-gray-600"} transition-all focus-within:border-blue-500 focus-within:shadow-lg`}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-transparent text-white outline-none placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>
              {/* Error message below input */}
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Continue Button */}
            <button type="submit" className="w-full bg-gradient-to-r from-gray-500 to-blue-700 hover:from-gray-600 hover:to-blue-800 transition-all text-white py-2 rounded-lg font-semibold shadow-md">
              Continue
            </button>
          </form>
        )}

        {/* Step 2: Enter Password (After Valid Email) */}
        {step === 2 && (
          <form onSubmit={handlePasswordSubmit}>
            {/* Email Field (Pre-filled) */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Email address</label>
              <input 
                type="email" 
                value={email}
                readOnly
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg outline-none cursor-not-allowed"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Password</label>
              <div className={`w-full rounded-lg border ${error ? "border-red-500" : "border-gray-600"} transition-all focus-within:border-blue-500 focus-within:shadow-lg`}>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-transparent text-white outline-none placeholder-gray-400"
                  placeholder="Enter your password"
                />
              </div>
              {/* Error message below input */}
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Sign Up Button */}
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 transition-all text-white py-2 rounded-lg font-semibold shadow-md">
              Sign Up
            </button>
          </form>
        )}

        {/* Already have an account? */}
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-400 hover:underline transition duration-300">Login</Link>
        </p>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-600" />
          <span className="text-gray-400 px-4">OR</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col gap-3">
          <button className="w-full bg-white text-gray-900 flex items-center justify-center py-2 rounded-lg shadow-md hover:bg-gray-200 transition">
            <i className="fab fa-google text-lg mr-2"></i> Continue with Google
          </button>
          <button className="w-full bg-white text-gray-900 flex items-center justify-center py-2 rounded-lg shadow-md hover:bg-gray-200 transition">
            <i className="fab fa-microsoft text-lg mr-2"></i> Continue with Microsoft Account
          </button>
          <button className="w-full bg-white text-gray-900 flex items-center justify-center py-2 rounded-lg shadow-md hover:bg-gray-200 transition">
            <i className="fab fa-apple text-lg mr-2"></i> Continue with Apple
          </button>
        </div>

        {/* Terms & Privacy Policy */}
        <p className="text-gray-500 text-center mt-6 text-sm">
          <Link to="/terms" className="hover:underline">Terms of Use</Link> | <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
        </p>

      </div>
    </div>
  );
};

export default SignUp;
