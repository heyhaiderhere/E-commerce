import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import {
	productsHandler,
	productHandlerById,
} from "../controllers/productController.js";
const router = express.Router();
router.get("/", productsHandler);

router.get("/:id", productHandlerById);

export default router;
