const ProductModel = require("../models/products.model");
const factory = require("../controllers/handlersFactory.controller");
const uploadMiddleware = require("../middleware/upload.middleware");
const ApiError = require("../util/AppHandleError");



const upload = uploadMiddleware("product-image");
const uploadImage = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);


const handelUpload = (req, res, next) => {
  if (!req.files || !req.files.imageCover) {
    return next(new ApiError("No image uploaded", 400));
  }

  const imageCoverUrl = req.files.imageCover[0].path; 
  req.body.imageCover = imageCoverUrl;

  if (req.files.images) {
    const imagesUrls = req.files.images.map(file => file.path);
    console.log(imagesUrls)
    req.body.images = imagesUrls;
  }

  next();
};


const createNewProduct = factory.createOne(ProductModel);

const getAllProducts = factory.getAll(ProductModel);

const getProductById = factory.getOne(ProductModel);

const updateProduct = factory.updateOne(ProductModel);

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