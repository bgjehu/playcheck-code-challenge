// load .env file for local development
import { config } from 'dotenv';

config();

export const DEBUG = process.env.DEBUG === 'true';
export const SERVER_PORT = parseInt(process.env.SERVER_PORT);
export const WEB_APP_HOST = process.env.WEB_APP_HOST || `http://localhost:${SERVER_PORT}`;
export const API_HOST = process.env.API_HOST || `http://localhost:${SERVER_PORT}`;
export const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://localhost:27017/main';
export const ISSUER_URL = process.env.ISSUER_URL;
export const OIDC_ENCRYTION_SECRET = process.env.OIDC_ENCRYTION_SECRET;
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const OAUTH_JWKS_URI = process.env.OAUTH_JWKS_URI;