//auth middleware to protect routes
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }
    try {
        // Verify the token and extract the user ID

        const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '7d' });
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Invalid token' });
    }
};