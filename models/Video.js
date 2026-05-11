import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    youtubeUrl: { type: String, required: true },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
    duration: { type: String, default: "" },
    order: { type: Number, default: 1 },
    thumbnail: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
