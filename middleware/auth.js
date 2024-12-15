const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Expect 'Bearer <token>'
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, 'codicoso2023'); // Replace 'your_jwt_secret' with a secure key
        req.user = decoded; // Attach user info to the request
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token.' });
    }
};

module.exports = { authenticateToken };
