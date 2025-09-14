import jwt from 'jsonwebtoken';
import User from "../models/users.models.js"

export const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

        if (!token)
            return res.status(401).json({ message: 'User is not authorized !' })

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findById(decoded.id).select("-passwordHash");

        if (!user)
            return res.status(401).json({ message: "Invalid user or invalid Token User !" })

        req.user = user;
        next();
        
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized !", error: error.message });
    }
}