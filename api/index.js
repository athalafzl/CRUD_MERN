import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "../utils/connectDB.js";
import userRouter from "../routes/userRoutes.js";
import bukuRouter from "../routes/bukuRoutes.js";
import profileRouter from "../routes/profileRoutes.js";
import { errorMiddlewares } from "../middlewares/errorMiddlewares.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/buku", bukuRouter);
app.use("/profile", profileRouter);

app.use(errorMiddlewares);

await connectDB();

export default app;
