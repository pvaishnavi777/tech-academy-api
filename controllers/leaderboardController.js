import User from "../models/User.js";

export const getLeaderboard = async (req, res, next) => {
  try {
    const users = await User.find({ role: "student" })
      .select("name points badges streakDays avatar")
      .sort("-points")
      .limit(20);
    res.json({ success: true, data: users });
  } catch (err) { next(err); }
};
