import Progress from "../models/Progress.js";
import User from "../models/User.js";

export const getProgress = async (req, res, next) => {
  try {
    let progress = await Progress.findOne({ userId: req.user.id })
      .populate("completedVideos", "title chapterId")
      .populate("completedTests", "title chapterId");
    if (!progress) {
      progress = await Progress.create({ userId: req.user.id });
    }
    res.json({ success: true, data: progress });
  } catch (err) { next(err); }
};

export const markVideoComplete = async (req, res, next) => {
  try {
    const { videoId } = req.body;
    const progress = await Progress.findOneAndUpdate(
      { userId: req.user.id },
      { $addToSet: { completedVideos: videoId } },
      { upsert: true, new: true }
    );
    // Award 10 points per video
    await User.findByIdAndUpdate(req.user.id, { $inc: { points: 10 } });
    res.json({ success: true, data: progress });
  } catch (err) { next(err); }
};

export const getStats = async (req, res, next) => {
  try {
    const progress = await Progress.findOne({ userId: req.user.id });
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      data: {
        videosWatched: progress ? progress.completedVideos.length : 0,
        testsCompleted: progress ? progress.completedTests.length : 0,
        points: user.points,
        streak: user.streakDays,
        badges: user.badges,
      }
    });
  } catch (err) { next(err); }
};
