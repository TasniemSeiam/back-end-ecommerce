const { check, validationResult, body } = require("express-validator");
const validationMiddleware = require("../../middleware/validator.middleware");
const CategoryModel = require("../../models/category.model");
const SubCategoryModel = require("../../models/subCategory.model");
const { default: slugify } = require("slugify");

exports.getProductValidator = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("invalid Product id format"),

  validationMiddleware,
];

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("title must be between 2 and 100 characters long")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("description")
    .notEmpty()
    .withMessage("description is required")
    .isLength({ max: 2000 }),

  check("price").notEmpty().withMessage("price is required").isNumeric(),

  check("priceAfterDisc")
    .optional()
    .isNumeric()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("price after discount must be lower than price");
      }
      return true;
    }),

  check("discount").optional().isNumeric(),

  check("stock")
    .notEmpty()
    .withMessage("stock is required")
    .isNumeric()
    .isInt({ gt: 0 })
    .withMessage("stock must be a positive integer"),

  check("sold").optional().isNumeric(),

  check("colors").optional().isArray(),
  check("size").optional().isArray(),
  check("material").optional().isArray(),

  check("imageCover").notEmpty().withMessage("image cover is required"),

  check("images").optional().isArray(),

  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((categoryId) =>
      CategoryModel.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })
    ),

  check("subcategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((subcategoriesIds) =>
      SubCategoryModel.find({
        _id: { $exists: true, $in: subcategoriesIds },
      }).then((result) => {
        if (result.length < 1 || result.length !== subcategoriesIds.length) {
          return Promise.reject(new Error(`Invalid subcategories Ids`));
        }
      })
    )
    .custom((val, { req }) =>
      SubCategoryModel.find({ category: req.body.category }).then(
        (subcategories) => {
          const subCategoriesIdsInDB = [];
          subcategories.forEach((subCategory) => {
            subCategoriesIdsInDB.push(subCategory._id.toString());
          });
          // subcategories ids in db include subcategories in req.body
          const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!checker(val, subCategoriesIdsInDB)) {
            return Promise.reject(
              new Error(`subcategories not belong to category`)
            );
          }
        }
      )
    ),

  check("ratingsAverage")
    .optional()
    .isNumeric()
    .isLength({ min: 1, max: 5 })
    .withMessage("rating must be between 1 and 5"),

  check("ratingQuantity").optional().isNumeric(),

  check("reviews").optional().isArray(),

  validationMiddleware,
];

exports.updateProductValidator = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("invalid Product id format"),
  body("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  validationMiddleware,
];

exports.deleteProductValidator = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("invalid Product id format"),

  validationMiddleware,
];
