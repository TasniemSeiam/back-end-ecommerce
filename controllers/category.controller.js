const CategoryModel = require("../models/category.model");

const factory = require("../controllers/handlersFactory.controller");

const createNewCategory = factory.createOne(CategoryModel);

const getAllCategories = factory.getAll(CategoryModel);

const getCategoryById = factory.getOne(CategoryModel);

const updateCategory = factory.updateOne(CategoryModel);

const deleteCategory = factory.deleteOne(CategoryModel);

module.exports = {
  createNewCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
