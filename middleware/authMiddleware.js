import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route. No token provided.",
    });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "The user belonging to this token no longer exists.",
      });
    }

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route. Invalid or expired token.",
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    const role = req.user?.role || "unknown";

    if (!roles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${role} is not authorized to access this route`,
      });
    }
    next();
  };
};
