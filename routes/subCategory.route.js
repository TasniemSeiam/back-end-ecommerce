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
<<<<<<< HEAD
const auth = require('../controllers/Auth.controller');

=======
>>>>>>> origin/main

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj ,getSubCategories)
<<<<<<< HEAD
  .post(auth.protect,auth.allowedTo('admin','seller'),setCategoryId,createSubCategoryValidator, createSubCategory);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategoryById)
  .put(auth.protect,auth.allowedTo('admin','seller'),setCategoryId,updateSubCategoryValidator, updateSubCategory)
  .delete(auth.protect,auth.allowedTo('admin','seller'),deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
=======
  .post(setCategoryId,createSubCategoryValidator, createSubCategory);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategoryById)
  .put(setCategoryId,updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
>>>>>>> origin/main
