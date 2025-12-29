import serverless from "serverless-http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";

dotenv.config();

const uri = process.env.MONGODB_URI;
const handler = serverless(app);

let isConnected = false;
async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  if (!uri) {
    console.error("MONGODB_URI not set");
    return;
  }
  if (!isConnected) {
    await mongoose.connect(uri);
    isConnected = true;
  }
}

export default async function (req, res) {
  await connectDB();
  return handler(req, res);
}
