import React from "react";
import { Link } from "react-router-dom";
import HomeFeatures from "../pages/HomeFeatures";
const Home = () => {
  return (
    <>
      <header className="flex flex-col items-center justify-center text-center py-20 bg-neutral-950 text-white">
        {/* Logo / Branding */}
        <h1 className="text-5xl font-bold mb-4">
          Meet<span className="text-gray-400">Pet</span>
        </h1>

        {/* Engaging Headline */}
        <h2 className="text-4xl font-semibold max-w-3xl leading-tight">
          Your AI-Powered Meeting Companion
        </h2>

        {/* Subheadline */}
        <p className="text-gray-400 max-w-2xl mt-4">
          Effortlessly capture notes, generate summaries, and interact with your
          AI assistant in real time.
        </p>

        {/* Call-To-Action Buttons */}
        <div className="mt-6 flex gap-4">
          <Link
            to="/signup"
            className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-6 py-3 rounded-md font-semibold hover:from-gray-700 hover:to-gray-500 transition-all"
          >
            Get Started
          </Link>
          <Link
            to="/features"
            className="border border-gray-600 px-6 py-3 rounded-lg font-semibold shadow-md transition hover:bg-gray-800"
          >
            Learn More
          </Link>
        </div>

        {/* AI Pet Animation or Illustration */}
        <div className="mt-12 flex flex-col items-center">
          {/* Lethal Company GIF */}
          <img 
            src="assets/gifs/lethal-company-dance.gif" 
            alt="Customize your pet"
            className="w-48 h-auto rounded-lg shadow-lg"
          />
          
          {/* Caption with Link */}
          <p className="text-gray-400 mt-4 text-lg">
            Customize the look of your meeting companion! 🎨
          </p>
          <Link
            to="/live-compagnion"
            className="mt-2 text-blue-400 hover:underline text-lg"
          >
            Choose Your AI Pet →
          </Link>
        </div>
      </header>
      <HomeFeatures></HomeFeatures>
    </>
  );
};

export default Home;
