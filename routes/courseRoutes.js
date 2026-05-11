import express from "express";
import { check } from "express-validator";

import {
  getCourses,
  getCourse,
  createCourse,
} from "../controllers/courseController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getCourses)
  .post(
    protect,
    authorize("admin"),
    [
      check("title", "Title is required").not().isEmpty()
    ],
    createCourse
  );

router.route("/:id").get(getCourse);

export default router;