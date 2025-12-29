import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

// connect to MongoDB (used for local/server runs)
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err?.message || "no response");
  });

app.listen(PORT, () => {
  console.log("Shaheen Science Academy server running on port " + PORT);
});
