import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GetVideo() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/");
      setVideos(res.data);

    } catch (error) {
      console.log("ERROR:", error);
      alert("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/${id}`);
      alert("Video deleted ✅");
      fetchVideos(); // refresh list
    } catch (error) {
      console.log(error);
      alert("Delete failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Uploaded Videos</h2>

      {loading && <p>Loading...</p>}

      {videos.length === 0 && !loading && <p>No videos found</p>}

      {videos.map((video) => (
        <div
          key={video._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "8px"
          }}
        >
          <h3>{video.title}</h3>
          <p>{video.description}</p>

          <video
            width="400"
            controls
            src={video.videoUrl}
          />

          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => handleDelete(video._id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 12px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}