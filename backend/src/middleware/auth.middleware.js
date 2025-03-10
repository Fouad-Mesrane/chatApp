

import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user.model";


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        
    }
}