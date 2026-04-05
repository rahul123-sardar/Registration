import React, { useState } from 'react';
import axios from 'axios';

const PdfUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append('pdf', file);      // Must match 'pdf' in pdfUpload.single("pdf")
    formData.append('title', title);   // Optional title field

    try {
      setLoading(true);
      setMessage('Uploading...');

      const response = await axios.post('http://localhost:5000/api/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(`Success! File URL: ${response.data.data.url}`);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Upload failed');
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Upload PDF to Cloudinary</h2>
      <form onSubmit={handleUpload}>
        <input 
          type="text" 
          placeholder="Document Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <input 
          type="file" 
          accept="application/pdf" 
          onChange={handleFileChange} 
          style={{ marginBottom: '10px' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Upload PDF'}
        </button>
      </form>
      {message && <p style={{ marginTop: '10px', fontSize: '14px' }}>{message}</p>}
    </div>
  );
};

export default PdfUpload;