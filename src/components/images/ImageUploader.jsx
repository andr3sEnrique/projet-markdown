import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { addImage } from "../../features/imagesSlice";
import { v4 as uuidv4 } from "uuid";
import { selectCurrentProfil } from "../../features/profilsSlice";

function ImageUploader() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const activeProfil = useSelector(selectCurrentProfil);

  const processFiles = (files) => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();

      reader.onload = (event) => {
        const base64 = event.target.result;
        const name = file.name;
        const id = uuidv4();
        const linkedProfil = activeProfil?.id || null;
        dispatch(addImage({ id, name, base64, linkedProfil }));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e) => {
    processFiles(e.target.files);
    e.target.value = null;
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    processFiles(files);
  };

  return (
    <div
      className="p-3 mb-3"
      style={{
        border: `2px dashed ${isDragging ? "#0d6efd" : "#ccc"}`,
        borderRadius: "5px",
        backgroundColor: isDragging ? "#f0f8ff" : "transparent",
        transition: "all 0.3s ease",
      }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Button onClick={handleClick}>Import Images (Click)</Button>
      <Form.Control type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }}></Form.Control>
      <p className="mt-2 text-muted">{isDragging ? "📁 Drop images here..." : "📤 Click the button or drag & drop images here"}</p>
      <p className="text-muted small mb-0">The images will be converted to Base64 and saved in the browser.</p>
    </div>
  );
}

export default ImageUploader;
