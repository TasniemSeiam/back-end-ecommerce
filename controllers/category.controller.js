const CategoryModel = require("../models/category.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../util/apiError");
const ApiFeatures = require("../util/apiFeatures");

const createNewCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const newCategory = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ message: "new category created", data: newCategory });
});

const getAllCategories = asyncHandler(async (req, res) => {
  
  //build query

  const countDocs = await CategoryModel.countDocuments();

  const apiFeatures = new ApiFeatures(CategoryModel.find(), req.query)
    .paginate(countDocs)
    .filter()
    .search()
    .limitFields()
    .sort();

  //execute query
  const { buildQuery, paginateResult } = apiFeatures;

  const categories = await buildQuery;

  res.status(200).json({
    message: "All Categories",
    results: categories.length,
    paginateResult,
    data: { categories },
  });
});

const getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    // return res.status(404).json({ message: "Category not found" });
    return next(new ApiError("Category not found", 404));
  }
  res.status(200).json({ message: "Category found", data: category });
});

const updateCategory = asyncHandler(async (req, res, next) => {
  const name = req.body.name;

  const category = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    { name, slug: slugify(name) },
    { new: true, runValidators: true }
  );
  // if (!category) return res.status(404).json({ message: "Category not found" });
  if (!category) {
    return next(new ApiError("Category not found", 404));
  }
  res.status(200).json({ message: "Category updated", data: category });
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await CategoryModel.findByIdAndDelete(req.params.id);
  // if (!category) return res.status(404).json({ message: "Category not found" });
  if (!category) {
    return next(new ApiError("Category not found", 404));
  }
  res.status(204).json({ message: "Category deleted", data: {} });
});

module.exports = {
  createNewCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
