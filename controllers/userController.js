import {
  registerUser as registerUserService,
  loginUser as loginUserService,
} from "../service/userService.js";

export async function registerUser(req, res) {
  try {
    const data = await registerUserService(req.body);

    return res.status(201).json({
      data: {
        nama: data.nama,
        email: data.email,
      },
    });
  } catch (error) {
    if (error.statusCode === undefined) {
      return res.status(500).json({
        message: error.message,
      });
    }
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
}

export async function loginUser(req, res, next) {
  try {
    const data = await loginUserService(req.body);

    return res.status(200).json({
      message: "Login berhasil",
      user: {
        nama: data.dataLogin.nama,
        email: data.dataLogin.email,
      },
      token: data.token,
    });
  } catch (error) {
    next(error);
  }
}

export function getMe(req, res) {
  const data = req.user;
  return res.json({
    data,
  });
}
