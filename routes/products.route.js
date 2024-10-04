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
<<<<<<< HEAD

=======
>>>>>>> origin/main
const {
  handelUpload,
  uploadImage,
} = require("../controllers/products.controller");

<<<<<<< HEAD
const auth = require("../controllers/Auth.controller");

=======
>>>>>>> origin/main
const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
<<<<<<< HEAD
  .post(
    auth.protect,
    auth.allowedTo("admin", "seller"),
    uploadImage,
    handelUpload,
    createProductValidator,
    createNewProduct
  );
=======
  .post(uploadImage, handelUpload, createProductValidator, createNewProduct);
>>>>>>> origin/main

router
  .route("/:id")
  .get(getProductValidator, getProductById)
<<<<<<< HEAD
  .put(
    auth.protect,
    auth.allowedTo("admin", "seller"),
    uploadImage,
    handelUpload,
    updateProductValidator,
    updateProduct
  )
  .delete(
    auth.protect,
    auth.allowedTo("admin","seller"),
    deleteProductValidator,
    deleteProduct
  );
=======
  .put(uploadImage, handelUpload, updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);
>>>>>>> origin/main

module.exports = router;
