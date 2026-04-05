import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetPdfList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get-pdfs`);
        const data = Array.isArray(response.data) ? response.data : response.data.pdfs;
        setPdfs(data || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load documents.");
        setLoading(false);
      }
    };
    fetchPdfs();
  }, []);

  // Transformation Helper
  const getPdfUrl = (url, type) => {
    if (!url) return "#";
    // Inline: Opens in browser | Attachment: Forces download
    const flag = type === 'view' ? 'fl_inline' : 'fl_attachment';
    return url.replace('/upload/', `/upload/${flag}/`);
  };

  if (loading) return <div style={styles.center}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Documents</h2>
      <div style={styles.grid}>
        {pdfs.map((file) => (
          <div key={file._id} style={styles.card}>
            <div style={styles.info}>
              <h4 style={styles.fileName}>{file.title}</h4>
              <p style={styles.subtext}>{file.originalName}</p>
            </div>

            <div style={styles.buttonGroup}>
              {/* VIEW BUTTON */}
              <a 
                href={`https://res.cloudinary.com/dchn8rrno/image/upload/v${file.version}/${file.public_id}.pdf`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{...styles.button, backgroundColor: '#28a745'}}
              >
                View ↗
              </a>

              {/* DOWNLOAD BUTTON */}
              <a 
                href={getPdfUrl(file.url, 'download')} 
                download={file.originalName}
                style={{...styles.button, backgroundColor: '#007bff'}}
              >
                Download ↓
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' },
  title: { borderBottom: '2px solid #eee', paddingBottom: '10px' },
  grid: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' },
  card: { 
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
    padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' 
  },
  info: { flex: 1 },
  fileName: { margin: 0, fontSize: '16px' },
  subtext: { margin: '2px 0 0', fontSize: '12px', color: '#666' },
  buttonGroup: { display: 'flex', gap: '10px' },
  button: { 
    color: 'white', padding: '8px 16px', borderRadius: '4px', 
    textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' 
  },
  center: { textAlign: 'center', marginTop: '50px' },
  error: { color: 'red', textAlign: 'center' }
};

export default GetPdfList;