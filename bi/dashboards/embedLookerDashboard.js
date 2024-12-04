const axios = require('axios');
const { getLookerToken, lookerConfig } = require('./lookerConfig');

/**
 * Generate an embed URL for a Looker dashboard
 * @param {string} dashboardId - ID of the Looker dashboard to embed
 * @param {Object} userAttributes - Attributes for the embedding user
 * @returns {Promise<string>} - Embed URL for the Looker dashboard
 */
const getEmbedUrl = async (dashboardId, userAttributes = {}) => {
  try {
    // Get Looker access token
    const token = await getLookerToken();

    // Embed URL request payload
    const payload = {
      target_url: `${lookerConfig.baseURL}/dashboards/${dashboardId}`,
      session_length: 3600, // Embed session duration in seconds
      force_logout_login: true,
      user_attributes: userAttributes,
    };

    // Make API request to generate embed URL
    const response = await axios.post(
      `${lookerConfig.baseURL}/api/4.0/embed_token`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.url;
  } catch (error) {
    console.error('Error generating Looker embed URL:', error.message);
    throw new Error('Failed to generate embed URL for Looker dashboard');
  }
};

module.exports = { getEmbedUrl };
