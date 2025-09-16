import axios from "axios";
import ENV from "./env-variables.js";

const callGeminiApi = async (context: string, query: string) => {
  const prompt = `
  Context:
  ${context}

  Question: ${query}
  Answer clearly based only on the context.
  `;

  // const res = await axios.post(
  //   `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${ENV.GEMINI_API_KEY}`,
  //   {
  //     contents: [{ parts: [{ text: prompt }] }],
  //   }
  // );

  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    },
    {
      headers: {
        "x-goog-api-key": ENV.GEMINI_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export default callGeminiApi;
