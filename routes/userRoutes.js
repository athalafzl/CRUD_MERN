import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();

router.post("/register", validateUser, registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe);

export default router;
