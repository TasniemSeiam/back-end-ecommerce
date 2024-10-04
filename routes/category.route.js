const express = require("express");
const {
  createNewCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  uploadImage,
  handelUpload,
<<<<<<< HEAD
  handelUpdateImage,
=======
>>>>>>> origin/main
} = require("../controllers/category.controller");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../util/validators/category.validator");
<<<<<<< HEAD
const subCategoriesRoute = require("./subCategory.route");
const auth = require('../controllers/Auth.controller');

=======

const subCategoriesRoute = require("./subCategory.route");
>>>>>>> origin/main
const router = express.Router();

router.use("/:categoryId/subcategories", subCategoriesRoute);

router
  .route("/")
  .get(getAllCategories)
<<<<<<< HEAD
  .post(auth.protect,auth.allowedTo('admin','seller'),uploadImage, handelUpload, createCategoryValidator, createNewCategory);
=======
  .post(
    uploadImage,
    handelUpload,
    createCategoryValidator,
    createNewCategory
  );
>>>>>>> origin/main

router
  .route("/:id")
  .get(getCategoryValidator, getCategoryById)
<<<<<<< HEAD
  .put(auth.protect,auth.allowedTo('admin','seller'),uploadImage, handelUpdateImage, updateCategoryValidator, updateCategory)
  .delete(auth.protect,auth.allowedTo('admin','seller'),deleteCategoryValidator, deleteCategory);
=======
  .put(
    uploadImage,
    handelUpload,
    updateCategoryValidator,
    updateCategory
  )
  .delete(deleteCategoryValidator, deleteCategory);
>>>>>>> origin/main

module.exports = router;
