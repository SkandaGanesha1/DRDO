// models/userModel.js
const pool = require('../config/db');

exports.submitFormData = async (data) => {
  const { name, email, qualification } = data;
  const query = 'INSERT INTO users(name, email, qualification) VALUES($1, $2, $3) RETURNING *';
  const values = [name, email, qualification];
  const result = await pool.query(query, values);
  return result.rows[0];
};
