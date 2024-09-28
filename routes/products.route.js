const express = require("express");
const {
  getAllProducts,
  createNewProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../util/validators/products.validator");
const {
  handelUpload,
  uploadImage,
} = require("../controllers/products.controller");

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(uploadImage, handelUpload, createProductValidator, createNewProduct);

router
  .route("/:id")
  .get(getProductValidator, getProductById)
  .put(uploadImage, handelUpload, updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
