import express from "express";
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	myOrders,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/myorders", protect, myOrders);
router.put("/:id/pay", protect, updateOrderToPaid);
router.get("/:id", protect, getOrderById);

export default router;
