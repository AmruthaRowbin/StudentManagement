const jwt = require('jsonwebtoken');
const Admin = require('../models/admin')
require('dotenv').config();


function adminAuthMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token.trim().split(' ')[1],process.env.JWTSCRET, async (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        try {
            const admin = await Admin.findById(decoded.adminId);
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }
            req.admin = admin;
            next();
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    });
}

module.exports = adminAuthMiddleware;






