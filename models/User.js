import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    password: { type: String, required: [true, "Password is required"], minlength: 6, select: false },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    avatar: { type: String, default: "" },
    points: { type: Number, default: 0 },
    badges: [{ type: String }],
    streakDays: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: null },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
    bio: { type: String, default: "" },
    class: { type: Number, default: null },
  },
  { timestamps: true }
);

// Hash password before save — Mongoose v7+ async hooks do NOT call next()
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update streak logic
userSchema.methods.updateStreak = function () {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (!this.lastActiveDate) {
    this.streakDays = 1;
  } else {
    const lastActive = new Date(this.lastActiveDate);
    const last = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
    const diff = (today - last) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      this.streakDays += 1;
    } else if (diff > 1) {
      this.streakDays = 1;
    }
  }
  this.lastActiveDate = now;
};

export default mongoose.model("User", userSchema);