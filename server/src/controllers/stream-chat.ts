import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import retrieveContext from "../utils/chroma-db.js";
import callGeminiApi from "../utils/gemini-api.js";
import normalizeMessages from "../utils/normalize-messages.js";
import redis from "../utils/redis-client.js";

const streamChat = async (req: Request, res: Response) => {
  const { sessionId, message } = req.body;
  try {
    // const sessionsString = await redis.lRange("sessions", 0, -1);

    // let message = "";
    // sessionsString.map((s) => {
    //   const a = JSON.parse(s);
    //   if (a.sessionId === sessionId) {
    //     message = a.text;
    //   }
    // });

    // Retrieve relevant context from vector DB
    const context = await retrieveContext(message);

    // Call Gemini with context
    const botResponse = await callGeminiApi(context, message);
    const result = normalizeMessages(botResponse);

    // Save bot response
    await redis.rPush(
      `chat:${sessionId}`,
      JSON.stringify({ role: "bot", content: result })
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      data: {
        result: result,
      },
      error: {},
    });
  } catch (error) {
    console.error("Failed to stream response: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {},
      error: { error },
    });
  }
};

export default streamChat;
