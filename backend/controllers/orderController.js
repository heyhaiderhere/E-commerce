import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { v4 as uuidv4 } from "uuid";
// @desc Saving orders into database
// @route 	POST /api/orders
// @access 	private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		taxPrice,
		paymentMethod,
		shippingPrice,
		itemsPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error("No order items");
		return;
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			taxPrice,
			paymentMethod,
			shippingPrice,
			itemsPrice,
			totalPrice,
		});

		const createdUsers = await order.save();
		res.status(201).json(createdUsers);
	}
});
// @desc Fetching a single order form orders
// @route 	GET /api/orders
// @access 	private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);

	if (order) {
		res.status(200).json(order);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});
// @desc updating orders paid or not
// @route 	PUT /api/orders/:id/pay
// @access 	private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: uuidv4(),
			status: true,
			updata_time: Date.now(),
			email_address: req.body.email,
		};
		const updatedUser = await order.save();
		res.json(updatedUser);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});
// @desc getting logged in user's order
// @route 	PUT /api/orders/myorders
// @access 	private
const myOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, myOrders };
