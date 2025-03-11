import express from 'express';
import { getUpcomingMeetings, createMeeting, updateMeeting, deleteMeeting  } from "../controllers/meetingsController.js";
import { sessionProtect } from '../middleware/sessionProtect.js';

const meetingRoute = express.Router();

meetingRoute.get("/upcoming", sessionProtect, getUpcomingMeetings);
meetingRoute.post("/", sessionProtect, createMeeting);
meetingRoute.put("/:meetingId", sessionProtect, updateMeeting);
meetingRoute.delete("/:meetingId", sessionProtect, deleteMeeting);

export default meetingRoute;

