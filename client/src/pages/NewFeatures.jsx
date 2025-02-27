import React from "react";
import FeatureCard from "./FeatureCard";
import { FaRobot, FaSyncAlt, FaLock, FaPaw, FaHandshake, FaGamepad } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const features = [
  {
    title: "AI-Powered Meeting Support",
    description:
      "No more manual note-taking your AI Compagnion listens, understands, and generates real-time meeting summaries so you can focus on the discussion",
    Icon: FaRobot,
    avatar: "/assets/images/dragon_1.jpg",
    src: "#"
  },
  {
    title: "Real Time Support",
    description:
      "Get real-time support, action items and solutions live without interrupting your flow.",
    Icon: FaHandshake,
    avatar: "/assets/images/dragon_2.jpg",
    src: "#"
  },
  {
    title: "Seamless Integrations",
    description:
      "Works effortlessly with Zoom, Teams, Slack, and more to streamline your workflow.",
    Icon: FaSyncAlt,
    avatar: "/assets/images/dragon_3.jpg",
    src: "#"
  },
  {
    title: "Enterprise-Grade Security",
    description:
      "Your data is protected with top-tier security protocols to ensure privacy.",
    Icon: FaLock,
    avatar: "/assets/images/dragon_4.jpg",
    src: "#"
  },
  {
    title: "Interactive AI Companion",
    description:
      "Engage with your AI companion using your voice, gestures, and dynamic interactions during meetings.",
    Icon: FaGamepad,
    avatar: "/assets/images/dragon_5.jpg",
    src: "#"
  },
  {
    title: "Customize your compagnion",
    description:
      "Customize your companion's personality, choose from professional, playful, or supportive based on your needs.",
    Icon: FaPaw,
    avatar: "/assets/images/dragon_6.jpg",
    src: "#"
  },
];

const gradientClasses = [
  "from-indigo-500 to-purple-600",
  "from-green-400 to-blue-500",
  "from-pink-500 to-red-500",
  "from-yellow-400 to-orange-500",
  "from-blue-400 to-indigo-600",
  "from-teal-400 to-green-500",
];

const Features = () => {
  return (
    <div className="pt-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-white mb-8 mt-10">
          Discover the Features
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              Icon={feature.Icon}
              delay={index * 0.2}
              gradient={gradientClasses[index % gradientClasses.length]}
              avatar= {feature.avatar}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
