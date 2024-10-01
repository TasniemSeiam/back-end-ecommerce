const CategoryModel = require("../models/category.model");
// const slugify = require("slugify");
// const asyncHandler = require("express-async-handler");
const ApiError = require("../util/AppHandleError");
// const ApiFeatures = require("../util/apiFeatures");
const uploadMiddleware = require("../middleware/upload.middleware");
const factory = require("../controllers/handlersFactory.controller");


const upload = uploadMiddleware("category-image");
const uploadImage = upload.single("image");

const handelUpload = (req, res, next) => {
  if (!req.file) {
    return next(new ApiError("No image uploaded", 400));
  }
  const fileUrl = req.file.path;
  req.body.image = fileUrl;
  next();
};
const createNewCategory = factory.createOne(CategoryModel);

const getAllCategories = factory.getAll(CategoryModel);

const getCategoryById = factory.getOne(CategoryModel);

const updateCategory = factory.updateOne(CategoryModel);

const deleteCategory = factory.deleteOne(CategoryModel);

module.exports = {
  createNewCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  uploadImage,
  handelUpload
};