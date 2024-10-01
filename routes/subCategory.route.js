const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  setCategoryId,
  createFilterObj,
} = require("../controllers/subCategory.controller");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../util/validators/subCategory.validator");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj ,getSubCategories)
  .post(setCategoryId,createSubCategoryValidator, createSubCategory);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategoryById)
  .put(setCategoryId,updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;