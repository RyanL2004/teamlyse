import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
    title: { type: String, required: true}, 
    description: { type: String, default: "" }, // Added if we want to store a description 
    date: { type: Date, required: true },   // Renamed from scheduledTime
    endTime: { type: Date, required: true }, // created seperate field for meeting end time 
    location: { type: String, default: ""},
    calendar: { type: String, required: true},  // The calendar the meetings will belong to 
    status: { type: String, default: "upcoming"}, // Feat others statuses: upcoming, completed etc 
    participants: [{ type: String }],        // [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    companionSelection: { type: String, required: true },
    chatHistory: { type: Array, default: [] },
    summary: { type: String, default: "" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    }, { timestamps: true })


export default mongoose.model("Meeting", meetingSchema)