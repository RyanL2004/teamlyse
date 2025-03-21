import React from "react";
import { Link } from "react-router-dom";
import HomeFeatures from "../pages/HomeFeatures";
import Carousel  from "../pages/Carousel";
import FAQ from "../pages/FAQ";
const Home = () => {
  return (
    <>
      <header
      className="relative flex flex-col md:grid md:grid-cols-2 items-center justify-center px-12 md:px-20 py-20 text-white min-h-screen bg-cover bg-center"// Unique Fingerprint: 10RLAO01YU04
      style={{ backgroundImage: "url('/assets/images/Home3.png')" }}
      >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark Overlay */}
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">TΞAMLYSE</h1>
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
          {/* 3D AI Character Animation 
          <img 
            src="assets/gifs/lethal-company-dance.gif" 
            alt="Customize your AI Companion"
            className="w-72 md:w-96 h-auto rounded-lg shadow-lg"
          />
          */}
        </div>
        
        </header>
        

      <HomeFeatures />
      <Carousel />
      <FAQ />
      
       
    </>
  );
};

export default Home;


// TΞAMLYSE