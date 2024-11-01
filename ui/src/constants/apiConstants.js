// src/constants/apiConstants.js

//const BASE_URL = "https://lbc-computer-institute-api.vercel.app";
const BASE_URL = "http://localhost:9090";
const ADMIN_BASE_URL = `${BASE_URL}/api/admin`;
const APPINFO_BASE_URL = `${BASE_URL}/api/appinfo`;
const BRANCHES_BASE_URL = `${BASE_URL}/api/branches`;
const DATABASE_BASE_URL = `${BASE_URL}/api/database-details`;

export const API_URLS = {
  APP_INFO_LIST: APPINFO_BASE_URL,
  ADMIN_LIST: ADMIN_BASE_URL,
  BRANCHES: BRANCHES_BASE_URL,
  DATABASE: DATABASE_BASE_URL,
  LOGIN: `${ADMIN_BASE_URL}/login`,
  UPDATE_PASSWORD: `${ADMIN_BASE_URL}/:id/password`,
};

export default API_URLS;
