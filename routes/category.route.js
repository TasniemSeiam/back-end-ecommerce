const express = require("express");
const {
  createNewCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  uploadImage,
  handelUpload,
} = require("../controllers/category.controller");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../util/validators/category.validator");
const subCategoriesRoute = require("./subCategory.route");
const router = express.Router();

router.use("/:categoryId/subcategories", subCategoriesRoute);

router
  .route("/")
  .get(getAllCategories)
  .post(uploadImage, handelUpload, createCategoryValidator, createNewCategory);

router
  .route("/:id")
  .get(getCategoryValidator, getCategoryById)
  .put(uploadImage, handelUpload, updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
