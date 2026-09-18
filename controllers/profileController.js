import { profileData } from "../service/profileService.js";

export async function getProfiles(req, res) {
  const data = await profileData(req.user.userId);
  return res.status(200).json({
    message: "Profile berhasil diakses",
    data,
  });
}
