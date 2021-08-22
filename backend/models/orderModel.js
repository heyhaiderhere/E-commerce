import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		orderItems: [
			{
				name: { type: String },
				qty: { type: Number },
				image: { type: String },
				price: { type: Number },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: "Product",
				},
			},
		],
		shippingAddress: {
			address: { type: String },
			postalCode: { type: String },
			city: { type: String },
			country: { type: String },
		},
		paymentMethod: {
			type: String,
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		taxPrice: {
			type: Number,
			default: 0.0,
		},
		totalPrice: {
			type: Number,
			default: 0.0,
		},
		shippingPrice: {
			type: Number,

			default: 0.0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		createdAt: {
			type: Date,
			required: true,
			default: Date.now(),
		},
		paidAt: {
			type: Date,
			required: true,
			default: Date.now(),
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date,
			required: true,
			default: Date.now(),
		},
	},
	{
		timestemps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
