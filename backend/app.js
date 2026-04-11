import express from "express";
import userRoutes from "./routes/registration.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Load local .env only if not running in Docker
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

// Routes
app.use("/api", userRoutes);
app.get("/", (req, res) => res.send("Backend is running!"));

// Database Connection Logic
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  console.log("DEBUG: Attempting connection with MONGO_URI:", uri ? "Found (HIDDEN)" : "UNDEFINED");

  if (!uri) {
    console.error("❌ Error: MONGO_URI environment variable is missing!");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected Successfully");

    // Start server ONLY after successful DB connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};

connectDB();

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err.message);
  res.status(500).json({ success: false, message: err.message });
});