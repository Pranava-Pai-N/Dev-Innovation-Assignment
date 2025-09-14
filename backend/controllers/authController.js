import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from '../models/users.models.js';
import { registerSchema, loginSchema } from "../Validation/schemas.js";

export const register = async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.message });


        const { name, email, password, role } = value;
        const exists = await User.findOne({ email });
        if (exists) 
            return res.status(409).json({ message: 'Email already registered' });


        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, passwordHash, role: role || 'user' });


        return res.status(201).json({
            message:"User registered Successfully !",
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });

    } catch (err) {
        return res.status(500).json({ message: 'Registration failed', error: err.message });
    }
};


export const login = async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) 
            return res.status(400).json({ message: error.message });


        const { email, password } = value;
        const user = await User.findOne({ email });

        if (!user) 
            return res.status(401).json({ message: 'Invalid credentials' });


        const correctPassword = await bcrypt.compare(password, user.passwordHash);

        if (!correctPassword) 
            return res.status(401).json({ message: 'Invalid credentials(Password is wrong !)' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_TOKEN, {
            expiresIn: '7d'
        });


        return res.json({ 
            message : "User Logged in Successfully !",
            token, 
            user: { id: user._id, name: user.name, email: user.email, role: user.role } });

    } catch (err) {
        return res.status(500).json({ message: 'Login failed', error: err.message });
    }
};
