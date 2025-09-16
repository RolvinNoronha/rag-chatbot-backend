import { Router } from "express";
import chatController from "../../controllers/chat-controller.js";
import getSession from "../../controllers/get-session.js";
import deleteSession from "../../controllers/delete-session.js";
import getSessions from "../../controllers/get-sessions.js";
import streamChat from "../../controllers/stream-chat.js";

const router = Router();

router.post("/stream-chat", streamChat);
router.post("/chat", chatController);

router.get("/sessions", getSessions);
router.get("/messages/:sessionId", getSession);

router.delete("/session/:sessionId", deleteSession);

export default router;
