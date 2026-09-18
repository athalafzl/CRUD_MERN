export function validateBuku(req, res, next) {
  if (
    req.body.judul.trim().length == 0 ||
    typeof req.body.judul !== "string" ||
    req.body.penulis.trim().length == 0 ||
    typeof req.body.penulis !== "string" ||
    typeof req.body.tahun !== "number"
  ) {
    return res.status(400).json({
      message: "Data buku tidak valid",
    });
  }
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Data perlu diisi",
    });
  }

  const allowFields = ["judul", "penulis", "tahun"];

  const isValid = Object.keys(req.body).every((field) =>
    allowFields.includes(field),
  );

  if (isValid === false) {
    return res.status(400).json({
      message: "Field tidak diizinkkan",
    });
  }
  next();
}
