import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Edit() {
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    return <h2>Invalid Image ID</h2>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image); // ✅ FIXED
  

    try {
      const res = await axios.put(
        `http://localhost:5000/api/edit_image/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);
      console.log("Updated Image:", res.data.image);

      navigate("/");

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Edit failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Image</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br /><br />
        <button type="submit">Update Image</button>
      </form>
    </div>
  );
}
