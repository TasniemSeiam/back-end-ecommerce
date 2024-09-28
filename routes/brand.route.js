const express = require("express");
const {
  getAllBrands,
  createNewBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../controllers/brand.controller");
const {
  createBrandValidator,
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../util/validators/brand.validator");
const {
  handelUpload,
  uploadImage,
} = require("../controllers/category.controller");

const router = express.Router();

router
  .route("/")
  .get(getAllBrands)
  .post(uploadImage, handelUpload, createBrandValidator, createNewBrand);

router
  .route("/:id")
  .get(getBrandValidator, getBrandById)
  .put(uploadImage, handelUpload, updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
