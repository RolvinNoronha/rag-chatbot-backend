import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const CHROMA_CLOUD_API_KEY = process.env.CHROMA_CLOUD_API_KEY;
const CHROMA_CLOUD_TENANT = process.env.CHROMA_CLOUD_TENANT;
const CHROMA_CLOUD_DB_NAME = process.env.CHROMA_CLOUD_DB_NAME;
const REDIS_USERNAME = process.env.REDIS_USERNAME;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;

export default {
  PORT,
  GEMINI_API_KEY,
  CHROMA_CLOUD_API_KEY,
  CHROMA_CLOUD_DB_NAME,
  CHROMA_CLOUD_TENANT,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_USERNAME,
  REDIS_PORT,
};
