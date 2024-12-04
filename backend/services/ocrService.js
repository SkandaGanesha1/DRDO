// services/ocrService.js
const { googleVisionAPIKey } = require('../config/ocrConfig');
const axios = require('axios');
const tesseract = require('tesseract.js');

exports.extractTextWithOCR = async (documentPath) => {
  try {
    // Google Vision OCR
    const response = await axios.post('https://vision.googleapis.com/v1/images:annotate', {
      requests: [
        {
          image: {
            content: documentPath,
          },
          features: [
            {
              type: 'DOCUMENT_TEXT_DETECTION',
            },
          ],
        },
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${googleVisionAPIKey}`,
      },
    });

    return response.data.responses[0].fullTextAnnotation.text;
  } catch (error) {
    console.error('Error extracting text with Google Vision:', error);
    throw new Error('Failed to extract text using OCR');
  }
};

// Optional: Tesseract OCR as a fallback or alternative
exports.extractTextWithTesseract = (imagePath) => {
  return tesseract.recognize(imagePath, 'eng', {
    logger: (m) => console.log(m),
  }).then(({ data: { text } }) => text);
};
