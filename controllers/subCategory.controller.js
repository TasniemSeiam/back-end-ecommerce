const SubCategoryModel = require("../models/subCategory.model");
const factory = require("../controllers/handlersFactory.controller");

exports.setCategoryId = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};

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
exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };
  req.filterObj = filterObj;
  next();
};

exports.getSubCategories = factory.getAll(SubCategoryModel);

exports.getSubCategoryById = factory.getOne(SubCategoryModel);
exports.updateSubCategory = factory.updateOne(SubCategoryModel);

exports.deleteSubCategory = factory.deleteOne(SubCategoryModel);