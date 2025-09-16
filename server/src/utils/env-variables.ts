import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default { PORT, GEMINI_API_KEY };
