const express = require("express");
const {
  getAllProducts,
  createNewProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  handelUploadForUpdate,
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
    auth.allowedTo("admin", "seller"),
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
    auth.allowedTo("admin", "seller"),
    uploadImage,
    handelUploadForUpdate,
    updateProductValidator,
    updateProduct
  )
  .delete(
    auth.protect,
    auth.allowedTo("admin","seller"),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
