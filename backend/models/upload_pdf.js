import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  title: { type: String },
  originalName: { type: String, required: true },
  fileType: { type: String, required: true },
  size: { type: Number, required: true },
  url: { type: String, required: true },
  version:{ type: String, required: true },
  public_id: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("PDF", pdfSchema);