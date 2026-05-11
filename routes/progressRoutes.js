import express from "express";
import { getProgress, markVideoComplete, getStats } from "../controllers/progressController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getProgress);
router.get("/stats", protect, getStats);
router.post("/video/complete", protect, markVideoComplete);

export default router;
