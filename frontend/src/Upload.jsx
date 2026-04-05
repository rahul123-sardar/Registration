import React, { useState } from "react";
import axios from "axios";

export default function MediaUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("media", file);

    try {
      setLoading(true);

    const res = await axios.post(
  "http://localhost:5000/api/upload",
  formData
);

      setUploadedUrl(res.data.url);
      alert("Upload successful ✅");
    } catch (error) {
     
  console.log("FULL ERROR:", error);
  console.log("SERVER RESPONSE:", error.response?.data);
  alert(error.response?.data?.message || "Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const isVideo = file?.type?.startsWith("video");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Video</h2>

      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
      />

      {preview && (
        <div style={{ marginTop: "20px" }}>
          {isVideo ? (
            <video width="300" controls src={preview} />
          ) : (
            <img width="300" src={preview} alt="preview" />
          )}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{ marginTop: "20px" }}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {uploadedUrl && (
        <div style={{ marginTop: "20px" }}>
          <h4>Uploaded File:</h4>
          {uploadedUrl.includes("video") ? (
            <video width="300" controls src={uploadedUrl} />
          ) : (
            <img width="300" src={uploadedUrl} alt="uploaded" />
          )}
        </div>
      )}
    </div>
  );
}