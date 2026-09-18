import Buku from "../models/Buku.js";
import { AppError } from "../utils/AppError.js";

export async function createBuku(data) {
  const dataBuku = await Buku.findOne({
    judul: data.judul,
    userId: data.userId,
  });

  if (dataBuku) {
    throw new AppError(`Buku dengan judul ${data.judul} sudah ada`);
  }
  const bukuBaru = new Buku(data);

  await bukuBaru.save();

  return bukuBaru;
}

export async function getBuku(userId) {
  return Buku.find({
    userId,
  });
}

export async function updateBuku(id, userId, data) {
  const existingBuku = await Buku.findOne({
    judul: data.judul,
    userId,
    _id: { $ne: id },
  });

  if (existingBuku) {
    throw new AppError(`Buku dengan judul ${data.judul} sudah ada`, 409);
  }

  const dataBuku = await Buku.findOneAndUpdate(
    {
      _id: id,
      userId,
    },
    data,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!dataBuku) {
    throw new AppError("Buku tidak ditemukan", 404);
  }
  return dataBuku;
}

export async function deleteBuku(id, userId) {
  const dataBuku = await Buku.findOneAndDelete({
    _id: id,
    userId,
  });
  if (!dataBuku) {
    throw new AppError("Buku tidak ditemukan", 404);
  }
  return dataBuku;
}
