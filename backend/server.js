import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDb from "./config/db.js";
import productRoute from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";
import orderRoute from "./routes/orderRoutes.js";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewares.js";
const app = express();
dotenv.config();
connectDb();
app.use(express.json());
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.json({
		name: "haider",
	});
});
app.use(routeNotFound);
app.use(errorHandler);

app.listen(port);
