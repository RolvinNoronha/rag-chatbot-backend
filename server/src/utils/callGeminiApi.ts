import axios from "axios";
import ENV from "../utils/env-variables.js";

const callGeminiApi = async (
  context: string,
  query: string
  // onChunk: (chunk: string) => void
) => {
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
      // responseType: "stream",
    }
  );

  // response.data.on("data", (chunk: Buffer) => {
  //   // Handle each chunk of data as it's received
  //   const data = chunk.toString();
  //   onChunk(data); // Invoke the callback with each chunk
  // });

  // return new Promise((resolve, reject) => {
  //   response.data.on("end", () => {
  //     resolve("Stream complete");
  //   });

  //   response.data.on("error", (err: any) => {
  //     reject(err);
  //   });
  // });
  return response.data;
};

export default callGeminiApi;
