const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategoryModel = require("../models/subCategory.model");
const ApiError = require("../util/apiError");
const ApiFeatures = require("../util/apiFeatures");

exports.setCategoryId = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};

exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res
    .status(201)
    .json({ message: "new subCategory created", data: subCategory });
});

exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };
  req.filterObj = filterObj;
  next();
};

exports.getSubCategories = asyncHandler(async (req, res) => {
  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 10;
  // const skip = (page - 1) * limit;

  // //build query
  // const buildQuery= SubCategoryModel.find(req.filterObj)
  // .skip(skip)
  // .limit(limit)
  //   .populate({ path: "category", select: "name" });
  // //execute query
  // const subCategories = await buildQuery;
  //build query

  const countDocs = await SubCategoryModel.countDocuments();

  const apiFeatures = new ApiFeatures(SubCategoryModel.find(), req.filterObj)
    .paginate(countDocs)
    .filter()
    .search()
    .limitFields()
    .sort()
    .populate();

  //execute query
  const { buildQuery, paginateResult } = apiFeatures;

  const subCategories = await buildQuery;

  res.status(200).json({
    message: "All subCategories",
    results: subCategories.length,
    paginateResult,
    data: { subCategories },
  });
});

exports.getSubCategoryById = asyncHandler(async (req, res) => {
  const subCategory = await SubCategoryModel.findById(req.params.id).populate({
    path: "category",
    select: "name",
  });

  if (!subCategory) {
    throw new ApiError("SubCategory not found", 404);
  }
  res.status(200).json({ message: "Subcategory found", data: subCategory });
});

exports.updateSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const subCategory = await SubCategoryModel.findByIdAndUpdate(
    req.params.id,
    { name, slug: slugify(name), category },
    { new: true, runValidators: true }
  );
  if (!subCategory) {
    throw new ApiError("Subcategory not found", 404);
  }
  res.status(200).json({ message: "Subcategory updated", data: subCategory });
});

exports.deleteSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategoryModel.findByIdAndDelete(req.params.id);
  if (!subCategory) {
    throw new ApiError("Subcategory not found", 404);
  }
  res.status(204).json({ message: "Subcategory deleted" });
});
