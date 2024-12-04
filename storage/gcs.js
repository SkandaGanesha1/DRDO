// storage/gcs.js

const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEY_FILE, // Path to your Google Cloud service account key file
});

const bucketName = process.env.GCS_BUCKET_NAME; // Your Google Cloud Storage bucket name

/**
 * Upload a file to Google Cloud Storage
 * @param {string} localFilePath - Path of the file to upload
 * @param {string} destination - Destination path in GCS bucket
 */
const uploadToGCS = async (localFilePath, destination) => {
  try {
    await storage.bucket(bucketName).upload(localFilePath, {
      destination,
    });
    console.log(`File uploaded to ${bucketName}/${destination}`);
  } catch (error) {
    logError(`Error uploading file to GCS: ${error.message}`);
    throw new Error('Failed to upload file to GCS');
  }
};

/**
 * Log errors to a local log file
 * @param {string} message - Error message to log
 */
const logError = (message) => {
  const errorLogPath = path.resolve(__dirname, 'logs/error.log');
  const timestamp = new Date().toISOString();
  fs.appendFileSync(errorLogPath, `[${timestamp}] ${message}\n`);
};

/**
 * Log process events to a local log file
 * @param {string} message - Process message to log
 */
const logProcess = (message) => {
  const processLogPath = path.resolve(__dirname, 'logs/process.log');
  const timestamp = new Date().toISOString();
  fs.appendFileSync(processLogPath, `[${timestamp}] ${message}\n`);
};

module.exports = { uploadToGCS, logError, logProcess };
