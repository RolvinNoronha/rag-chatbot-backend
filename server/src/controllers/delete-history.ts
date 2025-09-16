import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import redis from "../utils/redis-client.js";

const deleteHistory = async (req: Request, res: Response) => {
  try {
    await redis.del(`chat:${req.params.sessionId}`);
    return res.status(StatusCodes.OK).json({
      success: true,
      data: {
        message: "successfully deleted the session",
      },
    });
  } catch (error) {
    console.error("Failed to delete the sesion: ", error);
    return res.status(StatusCodes.OK).json({
      success: true,
      data: {
        message: "Failed to delete the session",
      },
      error: { error },
    });
  }
};

export default deleteHistory;
