const BrandModel = require("../models/brand.model");
const factory = require("../controllers/handlersFactory.controller");
const uploadMiddleware = require("../middleware/upload.middleware");

const upload = uploadMiddleware("brand-image");
const uploadImage = upload.single("image");

const handelUpload = (req, res, next) => {
  if (!req.file) {
    return next(new ApiError("No image uploaded", 400));
  }
  const fileUrl = req.file.path;
  req.body.image = fileUrl;
  next();
};
const createNewBrand = factory.createOne(BrandModel);

const getAllBrands = factory.getAll(BrandModel);

const getBrandById = factory.getOne(BrandModel);
const updateBrand = factory.updateOne(BrandModel);

const deleteBrand = factory.deleteOne(BrandModel);

module.exports = {
  createNewBrand,
  uploadImage,
  handelUpload,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};