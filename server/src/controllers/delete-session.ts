import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import redis from "../utils/redis-client.js";

const deleteSession = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  if (!sessionId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      data: {
        message: "missing session id",
      },
    });
  }

  try {
    await redis.del(`chat:${req.params.sessionId}`);
    const sessionsString = await redis.lRange("sessions", 0, -1);

    const sessions = await redis.lRange("sessions", 0, -1);

    // Find the element with matching id and remove it
    for (const sessionStr of sessions) {
      const session = JSON.parse(sessionStr);
      if (session.sessionId === sessionId) {
        // Use LREM to remove the exact string element once
        await redis.lRem("sessions", 1, sessionStr);
        break;
      }
    }

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

export default deleteSession;
