import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    completedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    completedTests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }],
    weeklyStats: [
      {
        week: { type: String }, // e.g. "2026-W18"
        videosWatched: { type: Number, default: 0 },
        testsCompleted: { type: Number, default: 0 },
        pointsEarned: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);
