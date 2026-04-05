import React, { useState } from "react";
import axios from "axios";
import GetImage from "./GetImage";
import Navbar from "./Navbar";
import Upload from "./Upload";
import { Link } from "react-router-dom";
import GetVideo from "./GetVideo";
import PDF from "./PDF";
import GetPdf from "./GetPdf";

export default function Home() {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    
    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload_image",
        formData
      );
      console.log(res.data.image._id);
      alert(res.data.message);
      console.log("Cloudinary URL:", res.data.image.url);

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <Navbar />
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Upload</button>
    </form>
    <Upload />
    <PDF />
    <GetImage />
    <GetVideo />
    <GetPdf />
    </div>
  );
}
