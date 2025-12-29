import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true }, // e.g., "Mathematics", "Physics", "Chemistry"
    instructor: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true }, // e.g., "3 months", "6 months"
    level: { type: String, required: true, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    fee: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
    description: { type: String, trim: true },
    schedule: { type: String, trim: true } // e.g., "Mon, Wed, Fri - 3:00 PM"
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);

