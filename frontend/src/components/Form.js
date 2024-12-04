import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherHusbandName: "",
    dob: "",
    nationality: "",
    address: "",
    pincode: "",
    mobile: "",
    email: "",
    idProof: null,
    casteCertificate: null,
    postalOrder: "",
    education: [{ class: "", board: "", year: "", subjects: "", percentage: "", marksCard: null }],
    experience: [
      { post: "", employer: "", period: "", natureOfWork: "", salary: "", remainder: "", experienceCertificate: null },
    ],
    noObjectionCertificate: null,
    pwdCertificate: null,
  });

  const handleChange = (e, index = null, section = "") => {
    const { name, value, files } = e.target;

    if (section === "education") {
      const updatedEducation = [...formData.education];
      updatedEducation[index][name] = files ? files[0] : value;
      setFormData({ ...formData, education: updatedEducation });
    } else if (section === "experience") {
      const updatedExperience = [...formData.experience];
      updatedExperience[index][name] = files ? files[0] : value;
      setFormData({ ...formData, experience: updatedExperience });
    } else if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddEducationRow = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { class: "", board: "", year: "", subjects: "", percentage: "", marksCard: null }],
    });
  };

  const handleAddExperienceRow = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { post: "", employer: "", period: "", natureOfWork: "", salary: "", remainder: "", experienceCertificate: null },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = { ...formData };
    const formDataObject = new FormData();

    // Append JSON data
    formDataObject.append("formData", JSON.stringify(formDataToSend));

    // Append files
    if (formData.idProof) formDataObject.append("idProof", formData.idProof);
    if (formData.casteCertificate) formDataObject.append("casteCertificate", formData.casteCertificate);
    if (formData.noObjectionCertificate) formDataObject.append("noObjectionCertificate", formData.noObjectionCertificate);
    if (formData.pwdCertificate) formDataObject.append("pwdCertificate", formData.pwdCertificate);

    formData.education.forEach((edu, index) => {
      if (edu.marksCard) {
        formDataObject.append("educationMarksCards", edu.marksCard);
      }
    });

    formData.experience.forEach((exp, index) => {
      if (exp.experienceCertificate) {
        formDataObject.append("experienceCertificates", exp.experienceCertificate);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/api/submitForm", {
        method: "POST",
        body: formDataObject,
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({
          name: "",
          fatherHusbandName: "",
          dob: "",
          nationality: "",
          address: "",
          pincode: "",
          mobile: "",
          email: "",
          idProof: null,
          casteCertificate: null,
          postalOrder: "",
          education: [{ class: "", board: "", year: "", subjects: "", percentage: "", marksCard: null }],
          experience: [
            { post: "", employer: "", period: "", natureOfWork: "", salary: "", remainder: "", experienceCertificate: null },
          ],
          noObjectionCertificate: null,
          pwdCertificate: null,
        });
      } else {
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting the form.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Father/Husband's Name:</label>
        <input type="text" name="fatherHusbandName" value={formData.fatherHusbandName} onChange={handleChange} />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
      </div>
      <div>
        <label>Nationality:</label>
        <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
      </div>
      <div>
        <label>Permanent Address:</label>
        <textarea name="address" value={formData.address} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Pincode:</label>
        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
      </div>
      <div>
        <label>Mobile Number:</label>
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>ID Proof (Pan Card/Driving License/Aadhaar Card):</label>
        <input type="file" name="idProof" onChange={handleChange} />
      </div>
      <div>
        <label>Caste Certificate (Gen/SC/ST/OBC):</label>
        <input type="file" name="casteCertificate" onChange={handleChange} />
      </div>
      <div>
        <label>Indian Postal Order:</label>
        <input type="text" name="postalOrder" value={formData.postalOrder} onChange={handleChange} />
      </div>
      <h3>Education Qualification:</h3>
      {formData.education.map((edu, index) => (
        <div key={index}>
          <input type="text" name="class" placeholder="Class/Degree" value={edu.class} onChange={(e) => handleChange(e, index, "education")} />
          <input type="text" name="board" placeholder="Board" value={edu.board} onChange={(e) => handleChange(e, index, "education")} />
          <input type="text" name="year" placeholder="Year of Passing" value={edu.year} onChange={(e) => handleChange(e, index, "education")} />
          <input type="text" name="subjects" placeholder="Subjects" value={edu.subjects} onChange={(e) => handleChange(e, index, "education")} />
          <input type="text" name="percentage" placeholder="Percentage" value={edu.percentage} onChange={(e) => handleChange(e, index, "education")} />
          <input type="file" name="marksCard" onChange={(e) => handleChange(e, index, "education")} />
        </div>
      ))}
      <button type="button" onClick={handleAddEducationRow}>
        Add More Education
      </button>
      <h3>Details of Any Other Experience:</h3>
      {formData.experience.map((exp, index) => (
        <div key={index}>
          <input type="text" name="post" placeholder="Post Held" value={exp.post} onChange={(e) => handleChange(e, index, "experience")} />
          <input type="text" name="employer" placeholder="Name of Employer" value={exp.employer} onChange={(e) => handleChange(e, index, "experience")} />
          <input type="text" name="period" placeholder="Period (From - To)" value={exp.period} onChange={(e) => handleChange(e, index, "experience")} />
          <input type="text" name="natureOfWork" placeholder="Nature of Work" value={exp.natureOfWork} onChange={(e) => handleChange(e, index, "experience")} />
          <input type="text" name="salary" placeholder="Salary" value={exp.salary} onChange={(e) => handleChange(e, index, "experience")} />
          <input type="text" name="remainder" placeholder="Remainder" value={exp.remainder} onChange={(e) => handleChange(e, index, "experience")} />
          <input type="file" name="experienceCertificate" onChange={(e) => handleChange(e, index, "experience")} />
        </div>
      ))}
      <button type="button" onClick={handleAddExperienceRow}>
        Add More Experience
      </button>
      <div>
        <label>No Objection Certificate:</label>
        <input type="file" name="noObjectionCertificate" onChange={handleChange} />
      </div>
      <div>
        <label>PwD Certificate:</label>
        <input type="file" name="pwdCertificate" onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
