import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    description: { type: String, default: "" },
    notes: { type: String, default: "" },
    order: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("Chapter", chapterSchema);
