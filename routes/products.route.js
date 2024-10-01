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

const auth = require("../controllers/Auth.controller");

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(
    auth.protect,
    auth.allowedTo("admin", "manager"),
    uploadImage,
    handelUpload,
    createProductValidator,
    createNewProduct
  );

router
  .route("/:id")
  .get(getProductValidator, getProductById)
  .put(
    auth.protect,
    auth.allowedTo("admin", "manager"),
    uploadImage,
    handelUpload,
    updateProductValidator,
    updateProduct
  )
  .delete(
    auth.protect,
    auth.allowedTo("admin"),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
