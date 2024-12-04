// controllers/formController.js
const { submitFormData } = require('../models/userModel');

exports.submitForm = async (req, res) => {
  const { name, email, qualification } = req.body;

  try {
    const result = await submitFormData({ name, email, qualification });
    res.status(200).json({ message: 'Form submitted successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form', error });
  }
};
