// models/documentModel.js
const pool = require('../config/db');

exports.uploadDocument = async (documentPath) => {
  const query = 'INSERT INTO documents(path) VALUES($1) RETURNING *';
  const values = [documentPath];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.verifyDocument = async (documentId) => {
  const query = 'SELECT * FROM documents WHERE id = $1';
  const values = [documentId];
  const result = await pool.query(query, values);
  return result.rows[0];
};
