const { check, validationResult } = require("express-validator");
const validationMiddleware = require("../../middleware/validator.middleware");

exports.getCategoryValidator = [
    check("id").isMongoId().withMessage("invalid category id format"),
    validationMiddleware
];

exports.createCategoryValidator = [
    check("name").notEmpty().withMessage("name is required"),
    check("name").isLength({ min: 3, max: 40 }).withMessage("name must be between 3 and 40 characters long"),
    validationMiddleware
]

exports.updateCategoryValidator = [
    check("id").isMongoId().withMessage("invalid category id format"),
    check("name").notEmpty().withMessage("name is required"),
    check("name").isLength({ min: 3, max: 40 }).withMessage("name must be between 3 and 40 characters long"),
    validationMiddleware
]

exports.deleteCategoryValidator = [
    check("id").isMongoId().withMessage("invalid category id format"),
    validationMiddleware
]
