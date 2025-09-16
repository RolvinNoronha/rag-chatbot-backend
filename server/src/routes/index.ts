import { Router, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/v1", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    success: false,
    data: "The api works!",
  });
});

export default router;
