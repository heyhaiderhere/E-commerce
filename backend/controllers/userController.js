import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
// @desc	user login
// @route	GET /api/users/profile
// @access	public
const userLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.send({
			email: user.email,
			id: user._id,
			isAdmin: user.isAdmin,
			name: user.name,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid username or password");
	}
});

// @desc	user registration
// @route	POST /api/users/profile
// @access	public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const existedUser = await User.findOne({ email });

	if (existedUser) {
		res.status(400);
		throw new Error("User already exists");
	}
	const user = await User.create({
		email: email,
		name: name,
		password: password,
	});
	if (user) {
		res.status(201);
		res.json({
			email: user.email,
			id: user._id,
			isAdmin: user.isAdmin,
			name: user.name,
			token: generateToken(user._id),
		});
	} else {
		res.status(404);
		throw new Error("Invalid user");
	}
});
// @desc
// @route	GET /api/users/profile
// @access	private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		res.json({
			email: user.email,
			id: user._id,
			isAdmin: user.isAdmin,
			name: user.name,
		});
	} else {
		res.status(404);
		res.send("User not found");
	}
});

// @desc	update user profile
// @route	PUT /api/users/profile
// @access	private

const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updatedUser = await user.save();
		res.json({
			email: updatedUser.email,
			id: updatedUser._id,
			isAdmin: updatedUser.isAdmin,
			name: updatedUser.name,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		res.send("User not found");
	}
});

// @desc	get all the users
// @route	GET /api/users/
// @access	private/admin
const getUserAdmin = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

// @desc	delete user
// @route	DELETE /api/users/:id
// @access	private/admin
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		user.remove();
		res.json({ message: "User removed" });
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @desc	get user by id
// @route	GET /api/users/:id
// @access	private/admin
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select("-password");
	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @desc	update user
// @route	PUT /api/users/:id
// @access	private/admin

const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin;

		const updatedUser = await user.save();
		res.json({
			email: updatedUser.email,
			id: updatedUser._id,
			isAdmin: updatedUser.isAdmin,
			name: updatedUser.name,
		});
	} else {
		res.status(404);
		res.send("User not found");
	}
});

export {
	userLogin,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUserAdmin,
	deleteUser,
	updateUser,
	getUserById,
};
