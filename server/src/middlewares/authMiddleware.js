import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const JWT_SECRET = process.env.JWT_SECRET_KEY; // Your secret key from .env file

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
            
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify token
    req.user = decoded; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default verifyToken;
