import React, { useState, useEffect } from "react";

const ImageTabGallery = ({ images, productName }) => {
  const [activeImage, setActiveImage] = useState("");

  // Update active image if the product images array changes/loads
  useEffect(() => {
    if (images && images.length > 0) {
      setActiveImage(images[0].url);
    }
  }, [images]);

  if (!images || images.length === 0) {
    return <div style={{ padding: "20px", color: "#888" }}>No images available</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "400px" }}>
      {/* Active Main View Display */}
      <div style={{ width: "100%", height: "300px", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9" }}>
        <img 
          src={activeImage} 
          alt={productName} 
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} 
        />
      </div>

      {/* Image Tabs Track */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "5px" }}>
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(img.url)}
            style={{
              border: activeImage === img.url ? "2px solid #007bff" : "1px solid #ccc",
              borderRadius: "4px",
              padding: "2px",
              cursor: "pointer",
              backgroundColor: "#fff",
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <img 
              src={img.url} 
              alt={`tab-${index}`} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageTabGallery;