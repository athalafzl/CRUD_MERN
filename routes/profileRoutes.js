import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getProfiles } from "../controllers/profileController.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getProfiles);
router.get("/admin", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.json({
    message: "Selamat datang admin",
  });
});

export default router;
