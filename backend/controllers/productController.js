import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc Fetch all products
// @route 	GET /api/products
// @access 	public
export const productsHandler = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @desc Fetch single product
// @route 	GET /api/products/:id
// @access 	public
export const productHandlerById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404).json({ message: "Product not found" });
	}
});
