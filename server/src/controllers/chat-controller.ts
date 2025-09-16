import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "http-status-codes";

import redis from "../utils/redis-client.js";

const chatController = async (req: Request, res: Response) => {
  try {
    const { sessionId, message } = req.body;
    let sid = sessionId || uuidv4();

    // Save user message
    await redis.rPush(
      `chat:${sid}`,
      JSON.stringify({ role: "user", content: message })
    );

    if (!sessionId) {
      await redis.rPush(
        `sessions`,
        JSON.stringify({ sessionId: sid, text: message })
      );
    }

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: {
        sessionId: sid,
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
