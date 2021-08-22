import express from "express";
import {
	userLogin,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUserAdmin,
	deleteUser,
	getUserById,
	updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/", registerUser);
router.get("/", protect, admin, getUserAdmin);
router.post("/login", userLogin);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.delete("/:id", protect, admin, deleteUser);
router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, admin, updateUser);

export default router;
