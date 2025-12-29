import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Course from "./models/Course.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

// connect to MongoDB
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err?.message || "no response");
  });

// health route
app.get("/", (_req, res) => {
  res.json({ message: "Shaheen Science Academy server running on port " + PORT });
});

// GET /courses — all courses
app.get("/courses", async (_req, res) => {
  try {
    const courses = await Course.find().sort({ subject: 1, name: 1 });
    res.json({ count: courses.length, items: courses });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// GET /courses/subject/:subject — courses by subject
app.get("/courses/subject/:subject", async (req, res) => {
  try {
    const { subject } = req.params;
    const courses = await Course.find({ 
      subject: new RegExp(subject, "i"),
      available: true 
    }).sort({ name: 1 });
    res.json({ count: courses.length, items: courses });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses by subject" });
  }
});

// GET /courses/random — one random available course
app.get("/courses/random", async (_req, res) => {
  try {
    const [course] = await Course.aggregate([
      { $match: { available: true } },
      { $sample: { size: 1 } }
    ]);
    if (!course) return res.status(404).json({ error: "No available courses" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch random course" });
  }
});

// GET /courses/instructor/:instructor — courses by instructor
app.get("/courses/instructor/:instructor", async (req, res) => {
  try {
    const { instructor } = req.params;
    const courses = await Course.find({ 
      instructor: new RegExp(instructor, "i"),
      available: true 
    }).sort({ name: 1 });
    res.json({ count: courses.length, items: courses });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses by instructor" });
  }
});

// GET /subjects — list all unique subjects
app.get("/subjects", async (_req, res) => {
  try {
    const subjects = await Course.distinct("subject");
    res.json({ count: subjects.length, subjects });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
});

// global error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

app.listen(PORT, () => {
  console.log("Shaheen Science Academy server running on port " + PORT);
});
