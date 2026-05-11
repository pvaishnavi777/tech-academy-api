import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
    timeLimit: { type: Number, default: 600 }, // seconds
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    passingScore: { type: Number, default: 60 }, // percentage
    description: { type: String, default: "" },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

testSchema.virtual("questions", {
  ref: "Question",
  localField: "_id",
  foreignField: "testId",
});

export default mongoose.model("Test", testSchema);
