import React, { useState } from 'react';
import '../App.css';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    dob: '',
    nationality: '',
    address: '',
    pinCode: '',
    mobileNumber: '',
    email: '',
    idProof: null,
    casteCertificate: null,
    indianPostalOrder: '',
    educationQualifications: [{}, {}, {}],
    experienceDetails: [{}, {}, {}],
    noObjectionCertificate: null,
    pwdCertificate: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Application Form</h2>

      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Father/Husband's Name:</label>
        <input
          type="text"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Nationality:</label>
        <input
          type="text"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Permanent Address:</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Pincode:</label>
        <input
          type="text"
          name="pinCode"
          value={formData.pinCode}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Mobile Number:</label>
        <input
          type="number"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>ID Proof (Pan Card/Driving License/Aadhaar Card):</label>
        <input
          type="file"
          name="idProof"
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Caste Certificate (Gen/SC/ST/OBC):</label>
        <input
          type="file"
          name="casteCertificate"
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Indian Postal Order:</label>
        <input
          type="text"
          name="indianPostalOrder"
          value={formData.indianPostalOrder}
          onChange={handleChange}
        />
      </div>

      <h3>Education Qualification:</h3>
      <h5>Required Documents : 10th,12th and Gate Score</h5>
      {formData.educationQualifications.map((_, index) => (
        <div key={index}>
          <input
            type="text"
            name={`educationQualifications[${index}].class`}
            placeholder="Class/Degree"
            onChange={handleChange}
          />
          <input
            type="text"
            name={`educationQualifications[${index}].board`}
            placeholder="Board"
            onChange={handleChange}
          />
          <input
            type="text"
            name={`educationQualifications[${index}].year`}
            placeholder="Year of Passing"
            onChange={handleChange}
          />
          <input
            type="text"
            name={`educationQualifications[${index}].subjects`}
            placeholder="Subjects"
            onChange={handleChange}
          />
          <input
            type="text"
            name={`educationQualifications[${index}].percentage`}
            placeholder="Percentage"
            onChange={handleChange}
          />
          <input
            type="file"
            name={`educationQualifications[${index}].marksCard`}
            onChange={handleChange}
          />
        </div>
      ))}

      <h3>Details of Any Other Experience:</h3>
      {formData.experienceDetails.map((_, index) => (
        <div key={index}>
          <input
            type="text"
            name={`experienceDetails[${index}].poetHired`}
            placeholder="Poet Hired"
            onChange={handleChange}
          />
          <input
            type="text"
            name={`experienceDetails[${index}].employer`}
            placeholder="Name of Employer"
            onChange={handleChange}
          />
          <input
            type="text"
            name={`experienceDetails[${index}].periodFrom`}
            placeholder="Period (From)"
            onChange={handleChange}
          />
          <input
            type="text"
            name={`experienceDetails[${index}].periodTo`}
            placeholder="Period (To)"
            onChange={handleChange}
          />
          <input
            type="text"
            name={`experienceDetails[${index}].natureOfWork`}
            placeholder="Nature of Work"
            onChange={handleChange}
          />
          <input
            type="text"
            name={`experienceDetails[${index}].salary`}
            placeholder="Salary"
            onChange={handleChange}
          />
          <input
            type="text"
            name={`experienceDetails[${index}].remainder`}
            placeholder="Remainder"
            onChange={handleChange}
          />
          <input
            type="file"
            name={`experienceDetails[${index}].experienceCertificate`}
            onChange={handleChange}
          />
        </div>
      ))}

      <div>
        <label>No Objection Certificate (if applicable):</label>
        <input
          type="file"
          name="noObjectionCertificate"
          onChange={handleChange}
        />
      </div>

      <div>
        <label>PWD Certificate (if applicable):</label>
        <input
          type="file"
          name="pwdCertificate"
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplicationForm;
