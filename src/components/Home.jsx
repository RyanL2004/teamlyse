import React from "react";
import { Link } from "react-router-dom";
import HomeFeatures from "../pages/HomeFeatures";

const Home = () => {
  return (
    <>
      <header className="flex flex-col md:grid md:grid-cols-2 items-center justify-center px-12 md:px-20 py-20 bg-neutral-950 text-white min-h-screen">
        
        {/* 📌 Left Side: Branding & Content */}
        <div className="text-left">
          {/* Logo / Branding */}
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-white">TΞAMLYSE</span>
          </h1>

          {/* Engaging Headline */}
          <h2 className="text-4xl font-semibold max-w-lg leading-tight">
            Your AI-Powered Meeting Companion
          </h2>

          {/* Subheadline */}
          <p className="text-gray-400 max-w-md mt-4">
            Effortlessly capture notes, generate summaries, and interact with your
            AI assistant in real time.
          </p>

          {/* Call-To-Action Buttons */}
          <div className="mt-6 flex gap-2">
            <Link
              to="/signup"
              className="bg-white text-black px-5 py-2 rounded-full font-semibold shadow-md hover:bg-gray-300 transition-all"
            >
              Get Started
            </Link>
            <Link
              to="/features"
              className="px-6 py-2 font-semibold shadow-md transition hover:text-gray-300"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* 📌 Right Side: 3D AI Companion */}
        <div className="flex justify-center items-center mt-12 md:mt-0">
          {/* 3D AI Character Animation */}
          <img 
            src="assets/gifs/lethal-company-dance.gif" 
            alt="Customize your AI Companion"
            className="w-72 md:w-96 h-auto rounded-lg shadow-lg"
          />
        </div>
      </header>

      <HomeFeatures />
    </>
  );
};

export default Home;


// TΞAMLYSE