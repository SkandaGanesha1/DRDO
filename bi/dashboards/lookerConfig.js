const axios = require('axios');
require('dotenv').config();

/**
 * Configuration for Looker API
 */
const lookerConfig = {
  baseURL: process.env.LOOKER_API_URL, // Looker instance URL
  clientId: process.env.LOOKER_CLIENT_ID, // API client ID
  clientSecret: process.env.LOOKER_CLIENT_SECRET, // API client secret
};

/**
 * Get Looker API authentication token
 * @returns {Promise<string>} - Access token
 */
const getLookerToken = async () => {
  try {
    const response = await axios.post(
      `${lookerConfig.baseURL}/api/4.0/login`,
      {
        client_id: lookerConfig.clientId,
        client_secret: lookerConfig.clientSecret,
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Looker token:', error.message);
    throw new Error('Failed to authenticate with Looker API');
  }
};

module.exports = { getLookerToken, lookerConfig };
