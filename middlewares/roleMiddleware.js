export function roleMiddleware(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        message: "Akses ditolak",
      });
      // 403 = forbidden = terautentikasi namun akses ditolak
    }
    next();
  };
}
