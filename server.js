import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import bukuRouter from "./routes/bukuRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import { errorMiddlewares } from "./middlewares/errorMiddlewares.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "frontend", "dist")));

const PORT = process.env.PORT || 3000;

app.use("/users", userRouter);
app.use("/buku", bukuRouter);
app.use("/profile", profileRouter);

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use(errorMiddlewares);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server berjalan di port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB tidak berhasil terhubung", error.message);
  });
