import React, { useState } from "react";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gateScore: "",
    registrationNumber: "",
    allIndiaRank: "",
    file: null, // For file upload
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First, upload the file to Google Cloud Storage
      const fileData = new FormData();
      fileData.append("file", formData.file);

      const fileResponse = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: fileData,
      });

      if (!fileResponse.ok) {
        throw new Error("File upload failed.");
      }

      const fileResult = await fileResponse.json();
      const fileUrl = fileResult.fileUrl;

      // Prepare the structured data
      const structuredData = {
        name: formData.name,
        gateScore: formData.gateScore,
        registrationNumber: formData.registrationNumber,
        allIndiaRank: formData.allIndiaRank,
        fileUrl, // Save the file URL from Cloud Storage
      };

      // Now, send the structured data to Firestore
      const dataResponse = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(structuredData),
      });

      if (!dataResponse.ok) {
        throw new Error("Structured data submission failed.");
      }

      alert("Form submitted successfully!");
      setFormData({ name: "", gateScore: "", registrationNumber: "", allIndiaRank: "", file: null });
    } catch (error) {
      console.error(error);
      alert("Form submission failed.");
    }
  };

  return (
    <div>
      <h1>Application Form</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="number" name="gateScore" value={formData.gateScore} onChange={handleChange} placeholder="GATE Score" required />
        <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} placeholder="Registration Number" required />
        <input type="number" name="allIndiaRank" value={formData.allIndiaRank} onChange={handleChange} placeholder="All India Rank" required />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
