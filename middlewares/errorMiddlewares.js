export function errorMiddlewares(error, req, res, next) {
  console.log(error);
  if (error.statusCode !== undefined) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  } else {
    return res.status(500).json({
      message: error.message,
    });
  }
}
