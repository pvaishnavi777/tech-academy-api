import express from "express";

import {
  enrollCourse,
  getUserEnrollments,
} from "../controllers/enrollmentController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require login
router.use(protect);

router
  .route("/")
  .get(getUserEnrollments)
  .post(authorize("student", "admin"), enrollCourse); // Default role is student or admin

export default router;