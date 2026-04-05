import  User from "../models/registration.js";
import { comparePassword, hashPassword } from "../bcrypt/bcrypt.js";
import mongoose from "mongoose";
import Image from "../models/imageUpload.js";
import cloudinary from "../config/cloudinary.js";
import Video from "../models/videoSchema.js";
// import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import File from "../models/upload_pdf.js";
import  pdfUpload  from "../middleware/pdf.js";



const register = async (req, res) => {

  try {
    let userData=req.body;
    const { fullName, email, password, gender, address, phone } = userData;
   const hashedPassword = await hashPassword(password);

    // create user (auto saved)
    const newUser = await User.create({
      fullName,
      email,
      password:hashedPassword,
      gender,
      address,
      phone,
    });

   res.send(newUser);

  } catch (error) {
    res.send(error);
  }
};


const login = async (req, res)=>{

  try{
  let userData=req.body;
 const {email, password}=userData;
 const user=await User.findOne({email});

if (!user) {
      return alert("user not exists");
    }
const comparedPassword=await comparePassword(password, user.password);

if(!comparedPassword){
  return res.status(401).json({ message: "Invalid password" });
}

if(comparedPassword){
  return res.status(200).json({message:"login successfull!"});
}

}catch(e){
  return res.status(500).json({ message: "Server error" });
}

}





const uploadImage = async (req, res) => {
  try {
    console.log("INSIDE UPLOAD CONTROLLER");
    console.log("REQ.FILE =", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const image = await Image.create({
      public_id: req.file.filename,
      url: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    res.status(201).json({
      message: "Image uploaded successfully",
      image,
    });

  } catch (err) {
    console.error("BACKEND ERROR 👉", err);
    res.status(500).json({ message: err.message });
  }
};

const getImage= async (req, res)=>{
  let newImage=await Image.find({});
  console.log(newImage);
  res.json(newImage);
}








const editImage = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Image ID",
      });
    }

    // 2️⃣ Find image by ID
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    // 3️⃣ Check if file exists
    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }

    // 4️⃣ Update image data
    image.public_id = req.file.filename;
    image.url = req.file.path;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();

    // 5️⃣ Success response
    res.status(200).json({
      message: "Image updated successfully",
      image,
    });

  } catch (error) {
    console.error("🔥 REAL ERROR:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};



const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Find image in DB
    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // 2️⃣ Delete from Cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // 3️⃣ Delete from MongoDB
    await Image.findByIdAndDelete(id);

    res.status(200).json({ message: "Image deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};







// Upload Video
//  const uploadVideo = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }

//     // Upload to Cloudinary (large file support)
//     const result = await cloudinary.uploader.upload_large(req.file.path, {
//       resource_type: "video",
//       folder: "videoUploads",
//       chunk_size: 6000000,
//     });

//     // Delete local file after upload
//     // fs.unlinkSync(req.file.path);

//     // Save to MongoDB
//     const newVideo = await Video.create({
//   title: req.body.title,
//   description: req.body.description,
//   videoUrl: result.secure_url,   // ✅ MUST be secure_url
//   publicId: result.public_id,
//   duration: result.duration,
//   format: result.format,
//   size: result.bytes,
// });

//     res.status(201).json({
//       success: true,
//       message: "Video uploaded successfully",
//       data: newVideo,
//     });
//     console.log("CLOUDINARY RESULT:", result);

//   } catch (error) {
//     console.error("UPLOAD ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

 const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newVideo = await Video.create({
      title: req.body.title || "Untitled",
      description: req.body.description || "",
      videoUrl: req.file.path,     // Cloudinary URL
      publicId: req.file.filename, // Cloudinary public_id
      duration: req.file.duration,
      format: req.file.format,
      size: req.file.size,
    });

    res.status(201).json({
      success: true,
      data: newVideo,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

  const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });

    res.status(200).json(videos); // ✅ return array directly

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


 const getSingleVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      success: true,
      data: video,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


 const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(video.publicId, {
      resource_type: "video",
    });

    // Delete from DB
    await video.deleteOne();

    res.status(200).json({
      success: true,
      message: "Video deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





const pdfUploading = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary using a stream
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto", // Changed to auto for better document handling
        folder: "user_pdfs",
        // Note: We removed the 'flags' line here as it's not a valid upload parameter
      },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          return res.status(500).json({ message: "Cloudinary upload failed", error });
        }

        console.log("Cloudinary Result:", result);

        try {
          // Create database entry
          const newPDF = new File({
            title: req.body.title || "Untitled Document",
            originalName: req.file.originalname, // Taken from Multer
            fileType: "application/pdf",
            size: result.bytes,
            url: result.secure_url,
            version: result.version,
            public_id: result.public_id, // This will include 'user_pdfs/' prefix
          });

          await newPDF.save();

          res.status(201).json({
            message: "PDF uploaded successfully!",
            data: newPDF,
          });
        } catch (dbError) {
          console.error("Database Error:", dbError);
          res.status(500).json({ message: "Failed to save to database", error: dbError.message });
        }
      }
    );

    // Write the buffer to the stream
    uploadStream.end(req.file.buffer);

  } catch (err) {
    console.error("General Server Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

 
 const getPdf = async (req, res) => {
  try {
    // 1. Fetch all PDFs from the "PDF" collection
    const newPdf = await File.find({});


    // 2. Check if the terminal shows the data (for debugging)
   

    // 3. Return the array to the frontend
    res.status(200).json(newPdf);
  } catch (error) {
    // 4. This logs the EXACT reason for the 500 error in your VS Code terminal
    console.error("Error in getPdf controller:", error.message);

    res.status(500).json({ 
      success: false, 
      message: "Database fetch failed", 
      error: error.message 
    });
  }
};






export {register, login, uploadImage, getImage, editImage, deleteImage, uploadVideo, getAllVideos, getSingleVideo, deleteVideo, pdfUploading, getPdf};
