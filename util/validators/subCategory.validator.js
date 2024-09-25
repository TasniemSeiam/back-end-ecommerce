const { check, validationResult } = require("express-validator");
const validationMiddleware = require("../../middleware/validator.middleware");

exports.getSubCategoryValidator = [
    check("id").notEmpty().withMessage("id is required").isMongoId().withMessage("invalid SubCategory id format"),
    
    validationMiddleware
];

exports.createSubCategoryValidator = [
    check("name").notEmpty().withMessage("name is required"),
    check("name").isLength({ min: 2, max: 40 }).withMessage("name must be between 3 and 40 characters long"),
    check("category").notEmpty().withMessage("must belong to category").isMongoId().withMessage("invalid category id format"),
    validationMiddleware
]

exports.updateSubCategoryValidator = [
    check("id").notEmpty().withMessage("id is required").isMongoId().withMessage("invalid SubCategory id format"),
    check("name").notEmpty().withMessage("name is required"),
    check("name").isLength({ min: 3, max: 40 }).withMessage("name must be between 3 and 40 characters long"),
    // check("category").notEmpty().withMessage("must belong to category").isMongoId().withMessage("invalid category id format"),
    validationMiddleware
]

exports.deleteSubCategoryValidator = [
    check("id").notEmpty().withMessage("id is required").isMongoId().withMessage("invalid SubCategory id format"),

    validationMiddleware
]
