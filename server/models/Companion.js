import mongoose from "mongoose";

const CompanionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    persona: { type: String, required: true },
    description: { type: String },

    // Prompt engineering the AI for each companion 
    aiPrompt: { type: String },
    
    // For the 3D model, we store a URL or file path
    modelUrl: { type: String },
    scale: { type: Number, default: 1 },
    position: { type: [Number], default: [0,0,0] },
    rotation: { type: [Number], default: [0,0,0] },
    color: { type: String } 
},
{
    timestamps: true
}
);

export default mongoose.model("Companion", CompanionSchema);
