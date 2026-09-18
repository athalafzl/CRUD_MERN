import {
  createBuku as createBukuService,
  getBuku as getBukuService,
  updateBuku as updateBukuService,
  deleteBuku as deleteBukuService,
} from "../service/bukuService.js";

export async function createBuku(req, res, next) {
  try {
    const data = {
      ...req.body,
      userId: req.user.userId,
    };
    const dataBuku = await createBukuService(data);
    return res.status(201).json({
      dataBuku,
    });
  } catch (error) {
    next(error);
  }
}

export async function getBuku(req, res, next) {
  try {
    const data = await getBukuService(req.user.userId);
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateBuku(req, res, next) {
  try {
    const data = await updateBukuService(
      req.params.id,
      req.user.userId,
      req.body,
    );
    return res.status(200).json({
      message: "Data buku berhasil diperbarui",
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteBuku(req, res, next) {
  try {
    const data = await deleteBukuService(req.params.id, req.user.userId);
    return res.status(200).json({
      message: "Buku berhasil dihapus",
      data,
    });
  } catch (error) {
    next(error);
  }
}
