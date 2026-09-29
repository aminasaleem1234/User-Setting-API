
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  console.error(' Error:', message);

  res.status(status).json({
    success: false,
    message: message
  });
}

module.exports = { AppError, errorHandler };