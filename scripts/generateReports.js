const { fetchExtractedData } = require('./utils/dbUtil');
const fs = require('fs');
const path = require('path');

/**
 * Generate a report from extracted data
 * @param {string} outputFilePath - Path to save the generated report
 */
const generateReport = async (outputFilePath) => {
  try {
    console.log('Fetching extracted data...');
    const extractedData = await fetchExtractedData();

    console.log('Generating report...');
    const reportContent = extractedData.map((data) => {
      return `File ID: ${data.fileId}\nExtracted Data: ${JSON.stringify(data.extractedData, null, 2)}\n\n`;
    }).join('\n');

    fs.writeFileSync(outputFilePath, reportContent, 'utf8');
    console.log(`Report generated at: ${outputFilePath}`);
  } catch (error) {
    console.error(`Error generating report: ${error.message}`);
  }
};

// Example Usage
const reportFilePath = path.resolve(__dirname, '../storage/logs/extracted_data_report.txt');
generateReport(reportFilePath);
