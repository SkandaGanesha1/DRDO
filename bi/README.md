# Business Intelligence (BI) Integration

## Overview

This directory contains the setup for integrating Looker dashboards into the web application. It includes:

1. **`lookerConfig.js`**: Configuration for Looker API authentication.
2. **`embedLookerDashboard.js`**: Logic to generate embed URLs for Looker dashboards.

---

## Files

### `lookerConfig.js`

- Configures the Looker API using environment variables:
  - `LOOKER_API_URL`: Your Looker instance URL.
  - `LOOKER_CLIENT_ID`: Looker API client ID.
  - `LOOKER_CLIENT_SECRET`: Looker API client secret.
- Exports a method `getLookerToken` to fetch authentication tokens.

---

### `embedLookerDashboard.js`

- Contains a function `getEmbedUrl` to generate an embed URL for Looker dashboards.
- Requires:
  - Looker Dashboard ID.
  - User attributes (optional) for embedding-specific user permissions.
- Returns the embed URL to integrate into your application.

---

## Environment Variables

Ensure the following variables are added to your `.env` file:

```env
LOOKER_API_URL=https://your-looker-instance.com
LOOKER_CLIENT_ID=your_client_id
LOOKER_CLIENT_SECRET=your_client_secret
