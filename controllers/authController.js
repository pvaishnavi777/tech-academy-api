import User from "../models/User.js";
import generateToken from "../utils/jwt.js";

// @desc    Register user
// @route   POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide name, email and password" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

    const userRole = role === "admin" ? "admin" : "student";
    const user = await User.create({ name, email, password, role: userRole });
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true, token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, points: user.points, badges: user.badges, streakDays: user.streakDays }
    });
  } catch (error) { next(error); }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Please provide email and password" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    // Update streak
    user.updateStreak();
    await user.save({ validateBeforeSave: false });

    const token = generateToken(user._id, user.role);
    res.status(200).json({
      success: true, token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, points: user.points, badges: user.badges, streakDays: user.streakDays, avatar: user.avatar }
    });
  } catch (error) { next(error); }
};

// @desc    Get current user
// @route   GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) { next(error); }
};

// @desc    Update profile
// @route   PUT /api/auth/profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, avatar, class: userClass } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, avatar, class: userClass },
      { new: true, runValidators: false }
    );
    res.status(200).json({ success: true, data: user });
  } catch (error) { next(error); }
};