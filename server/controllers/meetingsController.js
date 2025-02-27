// Meetings Controller ( User Can Create, delete, Update (Debrief) a meeting )

import Meeting from "../models/Meetings.js";

// Get /api/meetings/upcoming - fetch meetings scheduled scheduled in the future 
export const getUpcomingMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.find({
            scheduledTime: { $gte: new Date()}
        }).sort({ scheduledTime: 1 });

        res.status(200).json(meetings);
    }
    catch (error) {
        console.error("Error fetching upcoming meetings:", error);
        res.status(500).json({ error: "Internal Server Error"});
    }
};

// POST /api/meetings - create a new meeting
export const createMeeting = async (req, res) => {
    try {
        const { title, scheduledTime, participants, companionSelection } = req.body;
        const meeting = new Meeting({ title, scheduledTime, participants, companionSelection });
        await meeting.save();

        res.status(201).json({ meeting });
    }
    catch( error ) {
        console.erro( "Error creating a new meeting ", error);
        res.status(500).json({ error: "Internal Server Error "});
    }
}

// PUT /api/meetings/:meetingId - update an existing meeting 
export const updateMeeting = async ( req, res ) => {
    try {
        const { meetingId } = req.params;
        const updateData = req.body;
        const meeting = await Meeting.findByIdAndUpdate(
            meetingId,
            { $set: updateData },
            {new: true, runValidators: true }
        );

        if (!meeting) {
            return res.status(404).json({ error: "Meeting not found" });
        }
        res.status(200).json(meeting);
    }
    catch (error) {
        console.error("Error Updating Meeting ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE /api/meetings/:meetingId - delete an existing meeting from the localStorage and Database

export const deleteMeeting = async (req, res) => {
    try {
    const { meetingId } = req.params;
    const meeting = await Meeting.findByIdAndDelete(meetingId);
    if (!meeting) {
        return res.status(404).json({ error: "Meeting not found for deletion"});
    }
    res.status(200).json({ message: "Meeting deleted successfully"});
    }
    catch (error) {
        console.error("Error deleting meeting", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

