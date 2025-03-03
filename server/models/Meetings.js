import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    scheduledTime: { type: Date, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    companionSelection: { type: String, required: true },
    chatHistory: { type: Array, default: []},
    summary: { type: String, default: ''},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

}, { timestamps: true });

export default mongoose.model('Meeting', meetingSchema)