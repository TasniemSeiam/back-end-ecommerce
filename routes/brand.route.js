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

const router = express.Router();

router.route("/").get(getAllBrands).post(createBrandValidator, createNewBrand);

router
  .route("/:id")
  .get(getBrandValidator, getBrandById)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
