import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteImage from "./DeleteImage";

export default function GetImage({id}) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get_image")
      .then((res) => {
        console.log(res.data);
        setImages(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const handleDeleteSuccess = (id) => {
    setImages(images.filter((img) => img._id !== id));
  };


  return (
    <div style={{
        padding: "20px",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}>
      {
        
  images.map((img) => (
    <div key={img._id}>
    <img
      
      src={img.url}
      alt="uploaded"
      width="200"
    /><br/>
    <Link to={`/edit/${img._id}`}>Edit</Link>
    <DeleteImage
            imageId={img._id}
            onDeleteSuccess={handleDeleteSuccess}
          />
    </div>
  ))
  
}
    </div>
  );
}
