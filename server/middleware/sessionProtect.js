import User from '../models/User.js';

export const sessionProtect = async ( req, res, next) => {
    if (req.session && req.session.userId) {
        try {
            const user = await User.findById(req.session.userId);
            
            // Check if User session doesn't exist 
            if (!user){
                return res.status(401).json({ error: "Unauthorized, user not found"});
            }

            req.user = user;
            return next();
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    return res.status(401).json({ error: "Unauthorized, no session found" })
}