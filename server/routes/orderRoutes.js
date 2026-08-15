import express from "express";
import {
  getAllOrders,
  placeOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

//place Order
router.post("/", protect, placeOrder);

//getAll order
router.get("/", protect, adminOnly, getAllOrders);

//OrderStatus
router.put("/:id", protect, adminOnly, updateOrderStatus);

export default router;
