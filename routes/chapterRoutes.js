import express from "express";
import { getChapters, getChapter, createChapter, updateChapter, deleteChapter } from "../controllers/chapterController.js";
import protect from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/", protect, getChapters);
router.get("/:id", protect, getChapter);
router.post("/", protect, adminOnly, createChapter);
router.put("/:id", protect, adminOnly, updateChapter);
router.delete("/:id", protect, adminOnly, deleteChapter);

export default router;
