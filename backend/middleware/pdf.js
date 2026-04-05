import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import PDF from "../models/upload_pdf.js"; // Path to your schema

const router = express.Router();

// Multer setup: Store in memory and filter for PDFs
const storage = multer.memoryStorage();
const pdfUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
});

export default pdfUpload;



