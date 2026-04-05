import axios from "axios";

export default function DeleteImage({ imageId, onDeleteSuccess }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/delete_image/${imageId}`
      );

      alert("Image deleted successfully");

      // Refresh image list after delete
      if (onDeleteSuccess) {
        onDeleteSuccess(imageId);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete image");
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: "6px 12px",
        backgroundColor: "red",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "8px"
      }}
    >
      Delete
    </button>
  );
}
