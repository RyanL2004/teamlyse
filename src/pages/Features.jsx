import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaSyncAlt, FaLock, FaPaw, FaGamepad, FaPaintBrush } from "react-icons/fa";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <section className="py-20 bg-neutral-950 text-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold"
        >
          Smarter Meetings, Less Effort
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gray-400 mt-4"
        >
          MeetPet is your AI-powered meeting assistant that captures key insights, 
          organizes your discussions, and enhances collaboration effortlessly.
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="mt-12 grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        
        {/* Feature 1 - AI-Powered Summaries */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full mx-auto mb-4">
            <FaRobot className="text-blue-400 text-2xl" />
          </div>
          <h3 className="text-xl font-semibold">AI-Powered Summaries</h3>
          <p className="text-gray-400 mt-2">
            No more manual note-taking—MeetPet listens, understands, and generates 
            real-time meeting summaries so you can focus on the discussion.
          </p>
        </motion.div>

        {/* Feature 2 - Seamless Integrations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full mx-auto mb-4">
            <FaSyncAlt className="text-blue-400 text-2xl" />
          </div>
          <h3 className="text-xl font-semibold">Seamless Integrations</h3>
          <p className="text-gray-400 mt-2">
            Works effortlessly with Zoom, Microsoft Teams, Slack, and more—automate 
            workflows and sync your meeting insights across all platforms.
          </p>
        </motion.div>

        {/* Feature 3 - Secure & Private */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full mx-auto mb-4">
            <FaLock className="text-blue-400 text-2xl" />
          </div>
          <h3 className="text-xl font-semibold">Enterprise-Grade Security</h3>
          <p className="text-gray-400 mt-2">
            Your data is encrypted with top-tier security standards, ensuring 
            your meetings remain private and protected.
          </p>
        </motion.div>
      </div>

      {/* See More Button */}
      <div className="mt-12 text-center">
        <Link to="/dashboard" className="text-blue-400 hover:underline text-lg">
          try these features →
        </Link>
      </div>

      {/* Second Features Section - Companion Customization & Interactiveness */}
      <div className="mt-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center"
        >
          Customize & Interact with Your AI Companion
        </motion.h2>

        <div className="mt-12 grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          
          {/* Feature 1 - Custom Skins */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full mx-auto mb-4">
              <FaPaintBrush className="text-blue-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold">Customize Your AI Pet</h3>
            <p className="text-gray-400 mt-2">
              Choose from a variety of skins, animations, and expressions to personalize 
              your AI meeting companion.
            </p>
          </motion.div>

          {/* Feature 2 - Interactive AI */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full mx-auto mb-4">
              <FaGamepad className="text-blue-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold">Interactive AI</h3>
            <p className="text-gray-400 mt-2">
              Engage with your AI pet using voice commands, real-time gestures, and 
              dynamic interactions during meetings.
            </p>
          </motion.div>

          {/* Feature 3 - Unique Personalities */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full mx-auto mb-4">
              <FaPaw className="text-blue-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold">AI with Personality</h3>
            <p className="text-gray-400 mt-2">
              Customize your AI companion’s personality—choose from playful, professional, 
              or supportive tones based on your needs.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
