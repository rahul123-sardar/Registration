import express from "express";
import userRoutes from "./routes/registration.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app=express();


app.use(cors({
  origin: "http://localhost:5173", // or whatever port your frontend is on
  methods: ["GET", "POST"],
  credentials: true
}));

// app.use(express.urlencoded({ extended: true }));

// app.use(express.json());

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

// app.use("/uploads", express.static("uploads")); // serve images
app.use("/api", userRoutes);


app.get("/", (req, res)=>{
    res.send("I am root");
});


 
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(5000, () => {
//       console.log("Server running on port 5000");
//     });
//   })
//   .catch(err => console.log(err));


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ Connection Failed:", err.message);
    process.exit(1); // Stop the server if DB fails
  }
};

connectDB();

  app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:");
  console.error(err);
  console.error("🔥 MESSAGE:", err.message);
  console.error("🔥 STACK:", err.stack);

  res.status(500).json({
    success: false,
    message: err.message,
  });
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
