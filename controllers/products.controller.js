const ProductModel = require("../models/products.model");
const factory = require("../controllers/handlersFactory.controller");
const uploadMiddleware = require("../middleware/upload.middleware");
const ApiError = require("../util/AppHandleError");


// upload single and multiple images
const upload = uploadMiddleware("product-image");

const uploadImage = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);


const handelUpload = (req, res, next) => {
  // Ensure the cover image is uploaded
  if (!req.files || !req.files.imageCover) {
    return next(new ApiError('No cover image uploaded', 400));
  }

  // Get the Cloudinary URL for the cover image
  req.body.imageCover = req.files.imageCover[0].path;

  // Get the Cloudinary URLs for additional images
  if (req.files.images) {
    // Map each file to its Cloudinary URL (flatten array of strings)
    req.body.images = req.files.images.map(file => file.path);
  } else {
    req.body.images = []; // If no additional images are uploaded
  }

  // Proceed to the next middleware
  next();
};


// @desc    Create product
// @route   POST  /api/v1/products
// @access  admin,seller
const createNewProduct = factory.createOne(ProductModel);

// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
const getAllProducts = factory.getAll(ProductModel);

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
const getProductById = factory.getOne(ProductModel);

// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  admin , seller 
const updateProduct = factory.updateOne(ProductModel);

// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  admin , seller 
const deleteProduct = factory.deleteOne(ProductModel);

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadImage,
  handelUpload,
};
