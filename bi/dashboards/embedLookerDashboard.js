const { getLookerAuthToken, lookerBaseUrl } = require('./lookerConfig');

const embedLookerDashboard = async (dashboardId) => {
  try {
    const token = await getLookerAuthToken();

    const embedUrl = `${lookerBaseUrl}/embed/dashboards/${dashboardId}`;
    console.log(`Embed URL: ${embedUrl}`);

    // Provide token and embed URL to frontend
    return { token, embedUrl };
  } catch (error) {
    console.error('Error embedding Looker dashboard:', error.message);
    throw new Error('Failed to embed Looker dashboard');
  }
};

module.exports = { embedLookerDashboard };
