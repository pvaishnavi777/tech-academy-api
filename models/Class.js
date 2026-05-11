import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    grade: { type: Number, required: true, min: 1, max: 10, unique: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "📚" },
    color: { type: String, default: "#6366f1" },
  },
  { timestamps: true }
);

export default mongoose.model("Class", classSchema);
