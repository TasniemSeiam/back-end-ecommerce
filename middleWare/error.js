

require("dotenv/config");

const globalError = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.ENV === "production" ? null : error.stack,
  });
};

const notFoundURL = (req, res, next) => {
  const error = new Error(`URL not found -- ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { globalError, notFoundURL };