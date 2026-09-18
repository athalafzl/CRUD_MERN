import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import bukuRouter from "./routes/bukuRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import { errorMiddlewares } from "./middlewares/errorMiddlewares.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/users", userRouter);
app.use("/buku", bukuRouter);
app.use("/profile", profileRouter);

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
