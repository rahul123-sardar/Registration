import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    duration: {
      type: Number, // duration in seconds
    },

    format: {
      type: String, // mp4, mov, etc.
    },

    size: {
      type: Number, // file size in bytes
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // optional (if using auth)
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export default mongoose.model("Video", videoSchema);