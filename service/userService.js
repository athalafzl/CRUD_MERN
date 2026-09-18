import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export async function registerUser(data) {
  const dataRegister = await User.findOne({
    email: data.email,
  });
  if (dataRegister) {
    throw new AppError("Email sudah terdaftar", 409);
  }
  const passwordHash = await bcrypt.hash(data.password, 8);
  data.password = passwordHash;
  const userBaru = new User(data);

  await userBaru.save();

  return userBaru;
}

export async function loginUser(data) {
  const dataLogin = await User.findOne({
    email: data.email,
  });

  if (!dataLogin) {
    throw new AppError("Email atau password salah", 400);
  }

  const compare = await bcrypt.compare(data.password, dataLogin.password);

  if (compare === false) {
    throw new AppError("Email atau password salah", 400);
  }

  const token = jwt.sign(
    {
      userId: dataLogin._id,
      role: dataLogin.role,
    },
    process.env.JWT_SECRET,
  );
  return {
    dataLogin,
    token,
  };
}
