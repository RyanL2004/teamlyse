import express from 'express';
import { getUpcomingMeetings, createMeeting, updateMeeting, deleteMeeting  } from "../controllers/meetingsController.js";
import protect from "../middleware/Auth.js";

const meetingRoute = express.Router();

meetingRoute.get("/upcoming", protect, getUpcomingMeetings);
meetingRoute.post("/", protect, createMeeting);
meetingRoute.put("/:meetingId", protect, updateMeeting);
meetingRoute.delete("/:meetingId", protect, deleteMeeting);

export default meetingRoute;

// End of file meetingRoute.js
