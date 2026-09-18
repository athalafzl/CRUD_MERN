import User from "../models/User.js";

export async function profileData(data) {
  const user = await User.findById(data).select("-password");

  if (!user) {
    throw new AppError("User tidak ditemukan", 404);
  }

  return user;
}
