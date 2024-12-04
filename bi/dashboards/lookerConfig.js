const axios = require('axios');
require('dotenv').config();

const lookerBaseUrl = process.env.LOOKER_BASE_URL;
const apiClientId = process.env.LOOKER_API_CLIENT_ID;
const apiClientSecret = process.env.LOOKER_API_CLIENT_SECRET;

const getLookerAuthToken = async () => {
  try {
    const response = await axios.post(`${lookerBaseUrl}/api/3.1/login`, {
      client_id: apiClientId,
      client_secret: apiClientSecret,
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Looker auth token:', error.message);
    throw new Error('Failed to authenticate with Looker API');
  }
};

module.exports = { getLookerAuthToken, lookerBaseUrl };
