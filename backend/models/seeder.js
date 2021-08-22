import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import User from "./userModel.js";
import Product from "./productModel.js";
import Order from "./orderModel.js";
import products from "../data/products.js";
import users from "../data/users.js";
import connectDb from "../config/db.js";

dotenv.config();
connectDb();

const importData = async () => {
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();

		const createdUsers = await User.insertMany(users);
		const adminUser = createdUsers[0]._id;

		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});
		await Product.insertMany(sampleProducts);

		console.log("Data imported successfully".green.inverse);
		process.exit();
	} catch (error) {
		console.error(`Error accourd: ${error}`.red.inverse);
		process.exit(1);
	}
};
const destroyData = async () => {
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();
		console.log.apply("Data Destroyed".red.inverse);
		process.exit();
	} catch (error) {
		console.error(`Error accourd: ${error}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[3] == "-d") {
	destroyData();
} else {
	importData();
}
