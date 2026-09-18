import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createBuku,
  getBuku,
  updateBuku,
  deleteBuku,
} from "../controllers/bukuController.js";
import { validateBuku } from "../middlewares/validateBuku.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, validateBuku, createBuku);
router.get("/", authMiddleware, getBuku);
router.put("/:id", authMiddleware, updateBuku);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteBuku);

export default router;
