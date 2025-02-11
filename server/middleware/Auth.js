import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";


//Middleware to protect routes

const protect = asyncHandler(async (req, res) => {
    let token;

    //Check if Auth hearder exists
    if (req.header.authorization && req.header.authorization.startsWith("Bearer")) {
        try {
        token = req.headers.authorization.split(" ")[1]; //Get token from header
        const decoded = jwt.verify( token, process.env.JWT_SECRET); //Decoding the token
        
        //Find user by decoded ID (excluding password)
        req.user = await User.findById( decoded.id).select("-password");
        next(); //Process to the next middleware
    }
    catch (err) {
        console.error(" JWT verification failed:", err);
        res.status(401).json({error: "Not Authorized, invalid token"});
    }
    
    }
if (!token) {
    res.status(401).json({ error: "Not Authorized, No token provided"})
}
});

export default protect;