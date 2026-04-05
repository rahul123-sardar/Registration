import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = path.extname(file.originalname).toLowerCase();
    
    let resource_type = "auto"; // Let Cloudinary decide
    let folder = "general_uploads";

    if (file.mimetype.startsWith("image")) {
      resource_type = "image";
      folder = "imageUploads";
    } else if (file.mimetype.startsWith("video")) {
      resource_type = "video";
      folder = "videoUploads";
    } else if (ext === ".pdf") {
      // IMPORTANT: Use "image" so Cloudinary can generate thumbnails
      resource_type = "image"; 
      folder = "pdfUploads";
    }

    // Clean filename: remove spaces and special characters
    const cleanName = file.originalname.split(".")[0].replace(/[^a-zA-Z0-9]/g, "_");

    return {
      folder: folder,
      resource_type: resource_type,
      public_id: `${cleanName}-${Date.now()}`,
      // Force format to pdf if it's a PDF to ensure proper processing
      format: ext === ".pdf" ? "pdf" : undefined, 
    };
  },
});

const upload = multer({ 
  storage, 
  limits: { fileSize: 100 * 1024 * 1024 } // Increased to 100MB to support videos better
});

export default upload;