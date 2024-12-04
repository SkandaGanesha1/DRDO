const fs = require('fs');
const path = require('path');
const { extractTextFromImage } = require('./utils/ocrUtil');
const { analyzeText } = require('./utils/nlpUtil');
const { saveExtractedData } = require('./utils/dbUtil');

/**
 * Process a document for text extraction and analysis
 * @param {string} filePath - Path to the document file
 * @param {string} fileId - Unique identifier for the file
 */
const processDocument = async (filePath, fileId) => {
  try {
    console.log(`Processing file: ${filePath}`);

    // Extract text using OCR
    const extractedText = await extractTextFromImage(filePath);
    console.log(`Extracted Text: ${extractedText}`);

    // Analyze extracted text using NLP
    const analyzedData = analyzeText(extractedText);
    console.log(`Analyzed Data: ${JSON.stringify(analyzedData)}`);

    // Save extracted and analyzed data to database
    await saveExtractedData(fileId, analyzedData);

    console.log(`Processing complete for file: ${filePath}`);
  } catch (error) {
    console.error(`Error processing document: ${error.message}`);
  }
};

// Example Usage
const exampleFilePath = path.resolve(__dirname, '../storage/documents/example.pdf');
processDocument(exampleFilePath, 'file-12345');
