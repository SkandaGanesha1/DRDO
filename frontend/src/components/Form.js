import React, { useState } from "react";
import { ref, push, set } from "firebase/database";
import { ref as storageRef, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";

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
    } else if (name === "idProof" || name === "casteCertificate" || name === "noObjectionCertificate" || name === "pwdCertificate") {
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
    const formRef = push(ref(db, "applications"));
    const key = formRef.key;

    const uploadFile = async (file, path) => {
      if (file) {
        const storageReference = storageRef(storage, `documents/${key}/${path}`);
        await uploadBytes(storageReference, file);
      }
    };

    await uploadFile(formData.idProof, "idProof");
    await uploadFile(formData.casteCertificate, "casteCertificate");
    await uploadFile(formData.noObjectionCertificate, "noObjectionCertificate");
    await uploadFile(formData.pwdCertificate, "pwdCertificate");

    for (let i = 0; i < formData.education.length; i++) {
      await uploadFile(formData.education[i].marksCard, `education/${i}/marksCard`);
    }

    for (let i = 0; i < formData.experience.length; i++) {
      await uploadFile(formData.experience[i].experienceCertificate, `experience/${i}/experienceCertificate`);
    }

    await set(formRef, formData);
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
        <label>No Objection Certificate (if applicable):</label>
        <input type="file" name="noObjectionCertificate" onChange={handleChange} />
      </div>
      <div>
        <label>PWD Certificate (if applicable):</label>
        <input type="file" name="pwdCertificate" onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
