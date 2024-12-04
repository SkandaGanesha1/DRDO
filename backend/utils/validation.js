// utils/validation.js
exports.validateFormData = (data) => {
    const { name, email, qualification } = data;
    if (!name || !email || !qualification) {
      throw new Error('All fields are required');
    }
    // Further validations can be added (e.g., regex for email format)
  };
  