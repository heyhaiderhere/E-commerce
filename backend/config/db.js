import mongoose from "mongoose";

const connectDb = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});
		console.log(
			`connection esteblished on host: ${conn.connection.host}`.bgCyan.underline
				.black
		);
	} catch (error) {
		console.error(`Error accoured ${error.message}`.red.underline.bold);
	}
};

export default connectDb;
