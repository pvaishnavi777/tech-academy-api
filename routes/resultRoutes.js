import express from "express";
import { getMyResults, getResult } from "../controllers/resultController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getMyResults);
router.get("/:id", protect, getResult);

export default router;
