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

const auth = require("../controllers/Auth.controller");

const router = express.Router();

router.route("/").get(getAllBrands).post(auth.protect,auth.allowedTo('admin', 'manager'),createBrandValidator, createNewBrand);

router
  .route("/:id")
  .get(getBrandValidator, getBrandById)
  .put(auth.protect,auth.allowedTo('admin', 'manager'),updateBrandValidator, updateBrand)
  .delete(auth.protect,auth.allowedTo('admin'),deleteBrandValidator, deleteBrand);

module.exports = router;