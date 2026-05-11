import express from "express";
import { getTests, getTest, createTest, updateTest, deleteTest, submitTest } from "../controllers/testController.js";
import protect from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/", protect, getTests);
router.get("/:id", protect, getTest);
router.post("/", protect, adminOnly, createTest);
router.put("/:id", protect, adminOnly, updateTest);
router.delete("/:id", protect, adminOnly, deleteTest);
router.post("/:id/submit", protect, submitTest);

export default router;
