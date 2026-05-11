const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err);

  // Mongoose Bad ObjectId
  if (err.name === "CastError") {
    error.statusCode = 404;
    error.message = "Resource not found";
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    error.statusCode = 400;
    error.message = "Duplicate field value entered";
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    error.statusCode = 400;
    error.message = messages.join(", ");
  }
  
  // JWT errors
  if (err.name === "JsonWebTokenError") {
    error.statusCode = 401;
    error.message = "Invalid token. Please log in again!";
  }
  if (err.name === "TokenExpiredError") {
    error.statusCode = 401;
    error.message = "Your token has expired! Please log in again.";
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default errorHandler;
