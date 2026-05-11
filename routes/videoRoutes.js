import express from "express";
import { getVideos, getVideo, createVideo, updateVideo, deleteVideo } from "../controllers/videoController.js";
import protect from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/", protect, getVideos);
router.get("/:id", protect, getVideo);
router.post("/", protect, adminOnly, createVideo);
router.put("/:id", protect, adminOnly, updateVideo);
router.delete("/:id", protect, adminOnly, deleteVideo);

export default router;
