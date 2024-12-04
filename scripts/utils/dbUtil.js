const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();

/**
 * Save extracted data to Firestore
 * @param {string} fileId - File identifier
 * @param {Object} data - Extracted and analyzed data
 */
const saveExtractedData = async (fileId, data) => {
  try {
    const docRef = firestore.collection('extractedData').doc(fileId);
    await docRef.set({ extractedData: data, timestamp: new Date() });
    console.log(`Data saved for fileId: ${fileId}`);
  } catch (error) {
    console.error(`Error saving data to Firestore: ${error.message}`);
    throw new Error('Failed to save data to Firestore');
  }
};

/**
 * Fetch all extracted data from Firestore
 * @returns {Promise<Array>} - Array of extracted data
 */
const fetchExtractedData = async () => {
  try {
    const snapshot = await firestore.collection('extractedData').get();
    const data = snapshot.docs.map((doc) => ({ fileId: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error(`Error fetching data from Firestore: ${error.message}`);
    throw new Error('Failed to fetch data from Firestore');
  }
};

module.exports = { saveExtractedData, fetchExtractedData };
