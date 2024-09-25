const ProductModel = require("../models/products.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../util/apiError");
const ApiFeatures = require("../util/apiFeatures");

const createNewProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const newProduct = await ProductModel.create(req.body);
  res.status(201).json({ message: "new Product created", data: newProduct });
});

const getAllProducts = asyncHandler(async (req, res) => {
  //build query

  const countDocs = await ProductModel.countDocuments();

  const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
    .paginate(countDocs)
    .filter()
    .search()
    .limitFields()
    .sort()
    .populate();

  //execute query
  const { buildQuery, paginateResult } = apiFeatures;

  const products = await buildQuery;

  res.status(200).json({
    message: "All Products",
    results: products.length,
    paginateResult,
    data: { products },
  });
});

const getProductById = asyncHandler(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id).populate({
    path: "category",
    select: "name",
  });
  if (!product) {
    // return res.status(404).json({ message: "Product not found" });
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({ message: "Product found", data: product });
});

const updateProduct = asyncHandler(async (req, res, next) => {
  if (req.body.title) req.body.slug = slugify(req.body.title);

  const product = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  // if (!Product) return res.status(404).json({ message: "Product not found" });
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({ message: "Product updated", data: product });
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await ProductModel.findByIdAndDelete(req.params.id);
  // if (!Product) return res.status(404).json({ message: "Product not found" });
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(204).json({ message: "Product deleted", data: {} });
});

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
