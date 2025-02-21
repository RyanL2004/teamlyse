import express from "express";
import { signup, signin, getProfile, updateProfile } from "../controllers/userController.js";
import protect from "../middleware/Auth.js";
import { sessionProtect } from "../middleware/sessionProtect.js";
import { body } from "express-validator";
import { processTextStream } from "ai";

const userRoute = express.Router();

// Get Started Route
userRoute.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  signup
);

// Login Route 
userRoute.post("/signin",
    [
        body("email").notEmpty().withMessage("Email is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    signin
);


// Get User Profile Route 
userRoute.get("/profile", sessionProtect, getProfile);

//Update User Profile Route
userRoute.put("/profile", sessionProtect, updateProfile);

// Delete /logout Route
userRoute.post("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying user session", err);
      return res.status(500).json({ error:"Could not log out."});
    }

    //Clear the session cookie if user is logging out (Cookie name: "connect.sid")
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logout successful" });
  });
});

export default userRoute;

