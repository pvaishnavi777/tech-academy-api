import express from "express";
import { getClasses, getClass, createClass, updateClass, deleteClass } from "../controllers/classController.js";
import protect from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/", protect, getClasses);
router.get("/:id", protect, getClass);
router.post("/", protect, adminOnly, createClass);
router.put("/:id", protect, adminOnly, updateClass);
router.delete("/:id", protect, adminOnly, deleteClass);

export default router;
