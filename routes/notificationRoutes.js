import express from "express";
import { getNotifications, markRead, createNotification } from "../controllers/notificationController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.put("/read", protect, markRead);
router.post("/", protect, createNotification);

export default router;
