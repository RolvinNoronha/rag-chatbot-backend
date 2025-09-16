import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import redis from "../utils/redis-client.js";

const getSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await redis.lRange("sessions", 0, -1);
    return res.status(StatusCodes.OK).json({
      success: true,
      data: {
        sessions: sessions.map((m) => JSON.parse(m)),
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

export default getSessions;
