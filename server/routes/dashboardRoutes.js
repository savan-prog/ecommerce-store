import express from "express";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", protect, adminOnly, getDashboardStats);

export default router;
