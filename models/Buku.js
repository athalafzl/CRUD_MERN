import mongoose from "mongoose";

const bukuSchema = mongoose.Schema(
  {
    judul: { type: String, required: true },
    penulis: { type: String, required: true },
    tahun: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  {
    collection: "buku",
  },
);

export default mongoose.model("Buku", bukuSchema);
