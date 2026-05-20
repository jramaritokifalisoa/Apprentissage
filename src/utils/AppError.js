class AppError extends Error {
  constructor(message, statusCode = 500, code = null, details = null) {
    super(message);

    this.status = statusCode;
    this.code = code;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      success: this.success,
      message: this.message,
      code: this.code,
      status: this.status,
    };
  }
}

module.exports = AppError;
