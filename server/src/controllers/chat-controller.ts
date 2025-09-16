import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "http-status-codes";

import redis from "../utils/redis-client.js";
import retrieveContext from "../utils/chromadb.js";
import callGeminiApi from "../utils/callGeminiApi.js";

const chatController = async (req: Request, res: Response) => {
  try {
    const { sessionId, message } = req.body;
    let sid = sessionId || uuidv4();

    // Save user message
    await redis.rPush(
      `chat:${sid}`,
      JSON.stringify({ role: "user", content: message })
    );

    // Retrieve relevant context from vector DB
    const context = await retrieveContext(message);

    // Call Gemini with context
    const botResponse = await callGeminiApi(context, message);

    // Save bot response
    await redis.rPush(
      `chat:${sid}`,
      JSON.stringify({ role: "bot", content: botResponse })
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: {
        sessionId: sid,
        response: botResponse,
      },
      error: {},
    });
  } catch (error) {
    console.error("Failed to create chat: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {},
      error: { error },
    });
  }
};

export default chatController;
