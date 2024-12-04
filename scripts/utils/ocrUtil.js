const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

/**
 * Extract text from an image or document using OCR
 * @param {string} filePath - Path to the file
 * @returns {Promise<string>} - Extracted text
 */
const extractTextFromImage = async (filePath) => {
  try {
    const [result] = await client.textDetection(filePath);
    const text = result.fullTextAnnotation?.text || '';
    return text;
  } catch (error) {
    console.error(`Error extracting text from image: ${error.message}`);
    throw new Error('OCR extraction failed');
  }
};

module.exports = { extractTextFromImage };
