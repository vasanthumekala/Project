import { ApiError } from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err?.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: err?.error || [],
    ...(process.env.NODE_ENV === "development" ? { stack: err?.stack } : {}),
  });
};

export { errorMiddleware };
