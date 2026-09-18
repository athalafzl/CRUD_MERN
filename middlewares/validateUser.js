export async function validateUser(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Data perlu diisi",
    });
  }
  if (
    typeof req.body.nama !== "string" ||
    req.body.nama.trim().length == 0 ||
    typeof req.body.email !== "string" ||
    req.body.email.trim().length == 0 ||
    typeof req.body.password !== "string" ||
    req.body.password.trim().length == 0
  ) {
    return res.status(400).json({
      message: "Data tidak valid",
    });
  }
  next();
}
