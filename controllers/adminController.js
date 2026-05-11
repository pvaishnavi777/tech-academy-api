import User from "../models/User.js";
import Class from "../models/Class.js";
import Subject from "../models/Subject.js";
import Chapter from "../models/Chapter.js";
import Video from "../models/Video.js";
import Test from "../models/Test.js";
import Result from "../models/Result.js";

export const getAdminStats = async (req, res, next) => {
  try {
    const [users, classes, subjects, chapters, videos, tests, results] = await Promise.all([
      User.countDocuments(),
      Class.countDocuments(),
      Subject.countDocuments(),
      Chapter.countDocuments(),
      Video.countDocuments(),
      Test.countDocuments(),
      Result.countDocuments(),
    ]);
    res.json({ success: true, data: { users, classes, subjects, chapters, videos, tests, results } });
  } catch (err) { next(err); }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort("-createdAt");
    res.json({ success: true, data: users });
  } catch (err) { next(err); }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted" });
  } catch (err) { next(err); }
};
