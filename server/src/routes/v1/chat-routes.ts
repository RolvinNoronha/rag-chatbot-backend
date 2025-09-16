import { Router } from "express";
import chatController from "../../controllers/chat-controller.js";
import getHistory from "../../controllers/get-history.js";
import deleteHistory from "../../controllers/delete-history.js";

const router = Router();

router.post("/chat", chatController);
router.get("/history/:sessionId", getHistory);
router.delete("history/:sessionId", deleteHistory);

export default router;
