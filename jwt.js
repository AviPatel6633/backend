var jwt = require('jsonwebtoken');
require('dotenv').config()

const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: "token not found" });

    // Extract JWT token from request header
    const token = authorization.split(' ')[1]; // Note the space
    if (!token) return res.status(401).json({ error: "User Unauthorized" });

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to request object
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid Token' });
    }
}

const generateToken = (userData) => {
    //generate a new user token using user data
    return jwt.sign(userData, process.env.JWT_SECRET);
    // return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn:10});
}
module.exports = {
    jwtAuthMiddleware,
    generateToken
}