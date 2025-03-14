// Meetings Controller ( User Can Create, delete, Update (Debrief) a meeting )
import Meeting from "../models/Meetings.js";

// Get /api/meetings/upcoming - fetch meetings scheduled scheduled in the future 
export const getUpcomingMeetings = async (req, res) => {
    try{
        console.log("fetching meetings for user:", req.user._id);

        const meetings = await Meeting.find({
            user: req.user._id,
            date: { $gte: new Date() } //Ensure correct field name 
        }).sort({ date: 1 }); // Use `date` instead of scheduledTime here
        
        console.log("fetched meetings:", meetings);

        res.status(200).json({ message: "Successfully fetched meetings", meetings })
    }
    catch (error) {
        console.error("Error fetching upcoming meetings:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


// POST /api/meetings - create a new meeting
export const createMeeting = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Check req
        console.log("Authentificated User:", req.user); // Check if User is autheticated

        const { title, date, endTime, location, calendar, status, participants, companionSelection } = req.body

        if(!title || !date || !endTime || !calendar || !companionSelection) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        //Validate Participants (ensuring they are Valid mongoDB objectIDs)
        // const validParticipants = participants.filter(p => mongoose.Types.ObjectId.isValid(p));

        const meeting = new Meeting ({
            title,
            date: date ? new Date(date).toISOString() : new Date().toISOString(),  // ✅ Ensure valid date
            endTime: endTime ? new Date(endTime).toISOString() : new Date(date).toISOString(),
            location: location || "Remote", // Optional
            calendar,
            status: status || "upcoming", // Default status value if not provided
            participants, //: validParticipants, // Use only valid ObjectIds
            companionSelection,
            user: req.user._id // Attach the logged in user 
        })

        await meeting.save();
        res.status(200).json({ message:"Meeting created successfully",meeting })
    }
    catch (error) {
        console.error("Error creating a new meeeting", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
};


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

