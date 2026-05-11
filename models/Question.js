import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true }, // index of correct option (0-3)
    explanation: { type: String, default: "" },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
