import express from "express";
import { register, login, uploadImage, getImage, editImage, deleteImage, getAllVideos, uploadVideo, getSingleVideo, deleteVideo, pdfUploading, getPdf} from "../controllers/registration.js";
import upload from "../middleware/upload.js";
import File from "../models/imageUpload.js";
import PDF from "../models/upload_pdf.js";
import  pdfUpload  from "../middleware/pdf.js";
import { v2 as cloudinary } from "cloudinary";


import fs from "fs";
import mongoose from "mongoose";

const router = express.Router();



router.post("/register", register);
router.post("/login", login);









router.post("/upload-pdf", pdfUpload.single("pdf"), pdfUploading);
router.get("/get-pdfs", getPdf);








import path from 'path';
import { fileURLToPath } from 'url';
// <--- IMPORTANT: Ensure this path to your model is correct



// This section fixes the "__dirname is not defined" error in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/pdf/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Validation: Ensure the ID is a valid MongoDB ObjectId to prevent casting crashes
    if (id.length !== 24) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    // 2. Find the document (Ensure 'Pdf' matches your imported model name)
    const pdfDoc = await PDF.findById(id);
    

    if (!pdfDoc) {
      return res.status(404).json({ success: false, message: "Document not found in database" });
    }

    // 3. CLOUDINARY LOGIC: Redirecting is the best way to handle cloud files
    if (pdfDoc.url && pdfDoc.url.startsWith('http')) {
      // Note: We use 302 redirect to ensure the browser follows the link
      return res.status(302).redirect(pdfDoc.url);
    }

    // 4. LOCAL FILE LOGIC: Using absolute paths to prevent "file not found" crashes
    const fileName = pdfDoc.fileName || (pdfDoc.url ? pdfDoc.url.split('/').pop() : 'document.pdf');
    const filePath = path.resolve(__dirname, '..', 'uploads', fileName);

    // Set headers to force "View" mode
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');

    return res.sendFile(filePath, (err) => {
      if (err) {
        if (!res.headersSent) {
          console.error("File Send Error:", err);
          return res.status(404).json({ success: false, message: "Physical file missing on server" });
        }
      }
    });

  } catch (error) {
    // This logs the ACTUAL error (like 'Pdf is not defined') to your terminal
    console.error("CRITICAL SERVER ERROR:", error.message); 
    return res.status(500).json({ success: false, message: "Internal Server Error", details: error.message });
  }
});









router.post("/upload_image", upload.single("image"), uploadImage);
router.get("/get_image", getImage);

















router.put("/edit_image/:id", upload.single("image"), editImage);
router.delete("/delete_image/:id",  deleteImage);
router.post("/upload", upload.single("media"), uploadVideo);
router.get("/", getAllVideos);
router.get("/:id", getSingleVideo);
router.delete("/:id", deleteVideo);


























export default router;
