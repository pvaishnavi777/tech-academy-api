import express from "express";
import { getAdminStats, getAllUsers, updateUser, deleteUser } from "../controllers/adminController.js";
import protect from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, getAdminStats);
router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id", protect, adminOnly, updateUser);
router.delete("/users/:id", protect, adminOnly, deleteUser);

export default router;
