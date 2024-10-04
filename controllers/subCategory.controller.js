const SubCategoryModel = require("../models/subCategory.model");
const factory = require("../controllers/handlersFactory.controller");

<<<<<<< HEAD
// @desc    Get specific subcategories for a given category
exports.setCategoryId = (req, res, next) => {
  // Nested route (Create)
=======
exports.setCategoryId = (req, res, next) => {
>>>>>>> origin/main
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};

<<<<<<< HEAD
// @desc    Create subCategory
// @route   POST  /api/v1/subcategories
// @access  admin , seller
=======
>>>>>>> origin/main
exports.createSubCategory = factory.createOne(SubCategoryModel);
/*
asyncHandler(async (req, res) => {
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
*/
<<<<<<< HEAD

// Nested route
// @route GET /api/v1/categories/:categoryId/subcategories
// @route GET /api/v1/categories/:categoryId/subcategories
=======
>>>>>>> origin/main
exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };
  req.filterObj = filterObj;
  next();
};

<<<<<<< HEAD
// @desc    Get list of subcategories
// @route   GET /api/v1/subcategories
// @access  Public
exports.getSubCategories = factory.getAll(SubCategoryModel);

// @desc    Get specific subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategoryById = factory.getOne(SubCategoryModel);

// @desc    Update specific subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  admin , seller
exports.updateSubCategory = factory.updateOne(SubCategoryModel);

// @desc    Delete specific subCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  admin , seller
exports.deleteSubCategory = factory.deleteOne(SubCategoryModel);
=======
exports.getSubCategories = factory.getAll(SubCategoryModel);

exports.getSubCategoryById = factory.getOne(SubCategoryModel);
exports.updateSubCategory = factory.updateOne(SubCategoryModel);

exports.deleteSubCategory = factory.deleteOne(SubCategoryModel);
>>>>>>> origin/main
