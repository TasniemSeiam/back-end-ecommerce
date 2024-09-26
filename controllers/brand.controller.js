const BrandModel = require("../models/brand.model");
const factory = require("../controllers/handlersFactory.controller");

const createNewBrand = factory.createOne(BrandModel);

const getAllBrands = factory.getAll(BrandModel);

const getBrandById = factory.getOne(BrandModel);
const updateBrand = factory.updateOne(BrandModel);

const deleteBrand = factory.deleteOne(BrandModel);

module.exports = {
  createNewBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
