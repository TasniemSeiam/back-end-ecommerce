const ProductModel = require("../models/products.model");
const factory = require("../controllers/handlersFactory.controller");

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
};
