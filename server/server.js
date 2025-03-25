import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import petRoute from "./routes/petRoute.js";
import meetingRoute from "./routes/meetingRoute.js";
import companionRoute from "./routes/companionRoute.js";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});
const app = express();

// Connect to db
connectDB();
console.log("NODE_ENV:", process.env.NODE_ENV);

// Middleware
app.use(
    cors({
      credentials: true, //  Allow cookies and authentication !
      origin: [
        "http://localhost:5173", // Allow localhost for testing
        "https://d8bao5pqag4tb.cloudfront.net", //  Deployed S3 Bucket CloudFont URL
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //  Allow common HTTP methods
      allowedHeaders: ["Content-Type", "Authorization"], //  Allow necessary headers
    })
  );
app.set("trust proxy", true); // Trust proxy 
app.use(express.json());

console.log("MONGO URI:", process.env.MONGO_URI);
// Session Management config & Cookies
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true, // Ensure cookie is inaccessible to client-side JS
      secure: process.env.NODE_ENV === "production",  //  Only over HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      // Specify the production back-end domain 

      // Optionally, we might need to set domain if required:
      // domain: ".fly.dev",
    },
  })
);

// Pet Route
app.use("/api/pets", petRoute);

//User Route
app.use("/api/users", userRoute);

//Meeting Route
app.use("/api/meetings", meetingRoute);

// Companion Route 
app.use("/api/companions", companionRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
