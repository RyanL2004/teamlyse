import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

const FeatureCard = ({ title, description, Icon, avatar, delay = 0, gradient = "from-indigo-500 to-purple-600" }) => {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      glareEnable={true}
      glareMaxOpacity={0.2}
      scale={1.05}
      className="w-full relative"
    >
      {avatar && (
        <img 
          src={avatar} 
          alt="3D Avatar" 
          className="bg-image rounded-xl w-full relative h-[450px] w-full"
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className={`bg-gradient-to-r ${gradient} rounded-xl p-6 h-[250px]shadow-2xl cursor-pointer transform transition hover:scale-105 `}
      >
        <div className="flex items-center justify-center mb-4">
          <Icon className="text-white text-4xl" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white opacity-90">{description}</p>
      </motion.div>
    </Tilt>
  );
};

export default FeatureCard;
