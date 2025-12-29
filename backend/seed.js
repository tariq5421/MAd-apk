import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js";

dotenv.config();

const data = [
  { 
    name: "Calculus Fundamentals", 
    subject: "Mathematics", 
    instructor: "Dr. Ahmed Khan",
    duration: "3 months",
    level: "Intermediate",
    fee: 5000,
    available: true,
    description: "Comprehensive course covering differential and integral calculus",
    schedule: "Mon, Wed, Fri - 3:00 PM"
  },
  { 
    name: "Quantum Physics", 
    subject: "Physics", 
    instructor: "Prof. Sarah Ali",
    duration: "6 months",
    level: "Advanced",
    fee: 8000,
    available: true,
    description: "Deep dive into quantum mechanics and wave-particle duality",
    schedule: "Tue, Thu - 5:00 PM"
  },
  { 
    name: "Organic Chemistry", 
    subject: "Chemistry", 
    instructor: "Dr. Muhammad Hassan",
    duration: "4 months",
    level: "Intermediate",
    fee: 6000,
    available: true,
    description: "Study of carbon compounds and organic reactions",
    schedule: "Mon, Wed - 2:00 PM"
  },
  { 
    name: "Biology Basics", 
    subject: "Biology", 
    instructor: "Dr. Fatima Sheikh",
    duration: "3 months",
    level: "Beginner",
    fee: 4500,
    available: true,
    description: "Introduction to cell biology, genetics, and ecosystems",
    schedule: "Tue, Thu, Sat - 10:00 AM"
  },
  { 
    name: "Linear Algebra", 
    subject: "Mathematics", 
    instructor: "Dr. Ahmed Khan",
    duration: "3 months",
    level: "Intermediate",
    fee: 5500,
    available: true,
    description: "Vectors, matrices, and linear transformations",
    schedule: "Mon, Wed, Fri - 4:00 PM"
  },
  { 
    name: "Thermodynamics", 
    subject: "Physics", 
    instructor: "Prof. Sarah Ali",
    duration: "4 months",
    level: "Intermediate",
    fee: 6500,
    available: true,
    description: "Heat, energy, and entropy in physical systems",
    schedule: "Tue, Thu - 3:00 PM"
  },
  { 
    name: "Inorganic Chemistry", 
    subject: "Chemistry", 
    instructor: "Dr. Muhammad Hassan",
    duration: "3 months",
    level: "Beginner",
    fee: 5000,
    available: true,
    description: "Properties and reactions of inorganic compounds",
    schedule: "Mon, Wed - 11:00 AM"
  },
  { 
    name: "Advanced Biology", 
    subject: "Biology", 
    instructor: "Dr. Fatima Sheikh",
    duration: "5 months",
    level: "Advanced",
    fee: 7500,
    available: false,
    description: "Advanced topics in molecular biology and genetics",
    schedule: "Tue, Thu - 6:00 PM"
  }
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding");

    await Course.deleteMany({});
    await Course.insertMany(data);

    const count = await Course.countDocuments();
    console.log("Seeded courses:", count);
  } catch (e) {
    console.error("Seeding failed:", e.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}
run();
