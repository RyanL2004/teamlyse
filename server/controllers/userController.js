import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";



// POST signup
export const signup = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, return them
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    //Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    //Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    //Generate a Json web token for each registered user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User created successfully!",
      token,
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /signin

export const signin = async (req, res) => {
  // Validate request body

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;
  try {
    //Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found try register" });
    }

    // Compare existing password to user's input password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    //Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //Store user info in session 
    req.session.userId = user._id;
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email, 
      profilePhoto: user.profilePhoto,
      bio: user.bio,
    };
    

    // Validate User's input credentials
    res.status(200).json({ message: "Login successful", token, user });

  } catch (error) {
    console.error("Failed to sign in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /me ( or /profile )

export const getProfile = (req, res) => {
  // req.user is attached by our Auth middleware
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Fetch User data from db
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error fetching user data", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Update User Info 
export const updateProfile = async (req, res) => {
  try {
    // req.user is set by the protect middleware
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // For security reasons, Might want to filter which fields can be updated
    const { name, bio, profilePhoto } = req.body;

    //Update user using Mongoose's findByIdAndUpdate
    const updatedUser = await User.findByIdAndUpdate( 
      req.user._id,
      { name, bio, profilePhoto },
      { new: true, runValidators: true } // runValidators ensures schema rules are applied 
    );

    res.status(200).json({ message: "Profile updated", user: updatedUser });

  }
  catch (error) {
    console.error("Error updating user info", error);
    res.status(500).json({ message: "Internal Server error" })
  }

}

