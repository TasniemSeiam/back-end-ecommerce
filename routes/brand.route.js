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
<<<<<<< HEAD
  handelUpdateImage,
} = require("../controllers/category.controller");
const auth = require('../controllers/Auth.controller');
=======
} = require("../controllers/category.controller");
>>>>>>> origin/main

const router = express.Router();

router
  .route("/")
  .get(getAllBrands)
<<<<<<< HEAD
  .post(auth.protect,auth.allowedTo('admin','seller'),uploadImage, handelUpload, createBrandValidator, createNewBrand);
=======
  .post(uploadImage, handelUpload, createBrandValidator, createNewBrand);
>>>>>>> origin/main

router
  .route("/:id")
  .get(getBrandValidator, getBrandById)
<<<<<<< HEAD
  .put(auth.protect,auth.allowedTo('admin','seller'),uploadImage, handelUpdateImage, updateBrandValidator, updateBrand)
  .delete(auth.protect,auth.allowedTo('admin','seller'),deleteBrandValidator, deleteBrand);
=======
  .put(uploadImage, handelUpload, updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);
>>>>>>> origin/main

module.exports = router;
