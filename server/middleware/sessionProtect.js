export const sessionProtect = (req, res, next) => {
    if (req.session && req.session.userId) {
        // Optionally, attaching user data from session to req.user 
        req.user = req.session.user;
        return next();
    }
    return res.status(401).json({ error: "Unauthorized, no session found"});
}