import express from 'express';
import User from '../models/User.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import protect from "../middleware/Auth.js";
import Pet from "../models/Pet.js";

const userRoute = express.Router();

// Register route 
userRoute.post('/signup', async (req, res)=> {
    const { name, email, password } = req.body;
    try{
        //Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists"});
        }

        const newUser = new User ({ name, email, password});
        await newUser.save();
        
        //Generate a Json web token for each registered user
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.status(201).json({ message: "User created successfully!", token, user: newUser });

        

    }
    catch(error) {
        console.error({error: "Error registering user:", error});
        res.status(500).json({message: "Internal server error"});
    }
})

//login route
userRoute.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return (
                res.status(404).json({error: 'User not found'})
            );
        };
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error:"Invalid credentials"})
                
            }
        // Generate JWT token to singed in user 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({message: "Login successful", token, user})
    }
    catch (error) {
        console.error('Error Loggin in', error);
        res.status(500).json({message: 'Internal server error'})
    }
})

//Save the user's selected pet (Protected Route)
userRoute.post('/selectPet', protect, async(req, res) => {
    const {petId} = req.body;
    try{
        // Check if the pet exists in DB
        const pet = await Pet.findById(petId);
    if (!pet) {
        return res.status(404).json({ error: "Pet not found"});
        
    }

    // Update users's selected pet
    const user = await User.findByIdAndUpdate(
        req.user._id,
        { selectedPet : pet._id },
        { new: true }
    ).populate("selectedPet"); // populate the pet data when the user chooses a new Pet
    res.status(200).json({message: "Pet selected successfully!", user})
}
catch (error) {
    console.error("error selecting pet:", error);
    res.status(500).json({ message: "Internal server error"})

}
})
// Get User Data (Protected Route) 
userRoute.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("selectedPet");
        if (!user) {
            return res.status(404).json({ error: "User not found"});
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({error: "Internal server error"})
    }
});

export default userRoute;