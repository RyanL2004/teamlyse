import mongoose from "mongoose";
import Companion from "../models/Companion.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";

// For ES modules, determine __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build the absolute path for the .env file (located in the server folder)
const envPath = path.join(
  __dirname,
  "../",
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"
);

// Load environment variables from the specified file
dotenv.config({ path: envPath });

// Optionally log the environment (you can remove these logs after confirming everything works)
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("MONGO_URI:", process.env.MONGO_URI);

// Define the companion data to seed into the database
const companions = [
  {
    name: "Dex",
    persona: "Formal",
    description:
      "Dex is your Real-Time Communication Facilitator. He continuously transcribes meeting discussions with precision and generates concise summaries when the meeting concludes, ensuring that no important detail or action item is missed. Ideal for academic lectures, daily stand-ups, and team meetings where accuracy is paramount.",
    aiPrompt: "", // FUTURE PROOF - TODO: Add AI prompts for Dex
    modelUrl: "hollowKnight",
    scale: 1,
    position: [0, -0.5, 0],
    rotation: [0, Math.PI / 2, 0],
    color: "#ff6b35",
  },
  {
    name: "Flavy",
    persona: "Advisor",
    description:
      "Flavy is an insightful advisor companion who excels as an Interactive Idea Generator and Engagement Enhancer. He actively listens during meetings to provide dynamic suggestions, creative solutions, and resource recommendations in real time. His interactive prompts stimulate creativity and foster an engaging environment, making him perfect for brainstorming sessions, collaborative strategy meetings, and creative discussions.",
    aiPrompt: "", // FUTURE PROOF - TODO: Add AI prompts for Flavy
    modelUrl: "hollowKnight",
    scale: 1,
    position: [0, -0.5, 0],
    rotation: [0, Math.PI / 2, 0],
    color: "#ff6b35",
  },
  {
    name: "Brody",
    persona: "Formal",
    description:
      "Brody combines formal precision with advanced analytics to serve as your Meeting Management & Analytics Companion. By continuously processing the meeting dialogue, Brody detects critical topics, monitors participant engagement, and offers actionable insights in real time. His live, data-driven recommendations and follow-up suggestions ensure that your meetings remain focused and productive, particularly in high-stakes corporate or strategic discussions.",
    aiPrompt: "", // FUTURE PROOF - TODO: Add AI prompts for Brody
    modelUrl: "hollowKnight",
    scale: 1,
    position: [0, -0.5, 0],
    rotation: [0, Math.PI / 2, 0],
    color: "#ff6b35",
  }
];

const seedCompanions = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    await Companion.deleteMany({});
    console.log("Deleted companion entries");

    await Companion.insertMany(companions);
    console.log("Inserted Companions");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding companions:", error);
    process.exit(1);
  }
};

seedCompanions();
