import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
    mimetype: { type: String },
    size: { type: Number },
  },
  { timestamps: true }
);
 const Image= mongoose.model("Image", imageSchema);

export default Image;