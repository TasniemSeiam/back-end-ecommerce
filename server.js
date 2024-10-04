<<<<<<< HEAD
require("dotenv").config();
const app = require("./app.js");
const mongoose = require("mongoose");

// dotenv.config({ path: "./config/.env" });
const DB = process.env.DB.replace("<db_password>", process.env.DB_PASS);
mongoose.connect(DB).then(() => {
  console.log("connected to db...");
});
const PORT = process.env.PORT || 3000;
// console.log(process.env);
const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT} on mode ${app.get("env")} ....`);
});

// Unhandled promise rejections from outside
process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err.message);
  console.error("Stack trace:", err.stack);
  server.close(() => {
    console.error("Server is closing due to unhandled rejection");
    // code(0) => exit with success
    // code(1) => exit with failure(uncaught exception)
=======
// const dotenv = require("dotenv");
require('dotenv').config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dbConnection = require("./config/database");

const categoryRoute = require("./routes/category.route");
const subCategoryRoute = require("./routes/subCategory.route");
const productsRoute = require("./routes/products.route");
const brandRoute = require("./routes/brand.route");
const ApiError = require("./util/apiError");
const globalErrorHandler = require("./middleware/error.middleware");

// dotenv.config();

// Connect DB
dbConnection();

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(process.env.NODE_ENV, "mode");
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productsRoute);


app.all("*", (req, res, next) => {
  next(new ApiError(`Route ${req.originalUrl} not found.`, 404));
});

// Error handling middleware from inside
app.use(globalErrorHandler);

// Server running on port 5000 or the specified port in the environment variable.
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Unhandled promise rejections from outside 
process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err.message);
  console.error('Stack trace:', err.stack);
  server.close(() => {
    console.error("Server is closing due to unhandled rejection");
>>>>>>> origin/main
    process.exit(1);
  });
});
