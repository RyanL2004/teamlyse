import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js';
import petRoute from './routes/petRoute.js';
import meetingRoute from './routes/meetingRoute.js';
dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
});
const app = express();

// Connect to db
connectDB();

// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "https://meeting-companion.vercel.app"], // Accept Requests from either local development domain or deployed domain
    credentials: true, //Allows credential Cookies to be sent over
} 

));
app.use(express.json());

console.log("MONGO URI:", process.env.MONGO_URI)
// Session Management config & Cookies 
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave:  false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: "sessions",
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            httpOnly: false, // Change back to true after production
            secure: process.env.NODE_ENV === "production",
        },
    })
);




// Pet Route
app.use('/api/pets', petRoute);

//User Route
app.use('/api/users', userRoute)

//Meeting Route
app.use('/api/meetings', meetingRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
