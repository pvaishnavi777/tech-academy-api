import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "📗" },
    color: { type: String, default: "#10b981" },
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);
