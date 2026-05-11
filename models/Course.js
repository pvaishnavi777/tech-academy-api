import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    instructor: {
      type: String,
      default: "Unknown Instructor",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", courseSchema);