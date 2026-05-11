import express from "express";
import { getSubjects, getSubject, createSubject, updateSubject, deleteSubject } from "../controllers/subjectController.js";
import protect from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/", protect, getSubjects);
router.get("/:id", protect, getSubject);
router.post("/", protect, adminOnly, createSubject);
router.put("/:id", protect, adminOnly, updateSubject);
router.delete("/:id", protect, adminOnly, deleteSubject);

export default router;
