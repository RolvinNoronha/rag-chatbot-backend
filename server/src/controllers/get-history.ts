import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import redis from "../utils/redis-client.js";

const getHistory = async (req: Request, res: Response) => {
  try {
    const messages = await redis.lRange(`chat:${req.params.sessionId}`, 0, -1);
    return res.status(StatusCodes.OK).json({
      success: true,
      data: {
        messages: messages.map((m) => JSON.parse(m)),
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

export default getHistory;
