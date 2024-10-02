const { body, param } = require("express-validator");

const registerVaildation = [
  body('username')
    .not()
    .isEmpty().withMessage("Name is required")
    .trim()
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters")
    .escape(),

    body('email')
    .not()
    .isEmpty()
    .withMessage("email is required")
    .trim()
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),

    body('password')
    .not()
    .isEmpty().withMessage("password is required")
    .trim()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[\W]/).withMessage('Password must contain at least one special character'),

    body('phone')
    .not()
    .isEmpty().withMessage("phone is required")
    .trim()
    .isMobilePhone().withMessage('Please enter a valid phone number')
    .isLength({ min: 10, max: 15 }).withMessage('Phone number must be between 10 to 15 digits'),
    
    body('address.country')
    .isString().withMessage('Country must be a valid string')
    .trim()
    .escape(),

    body('address.city')
    .isString().withMessage('City must be a valid string')
    .trim()
    .escape(),

    body('address.street')
    .isString().withMessage('street must be a valid string')
    .trim()
    .escape(),

    body('address.zipcode')
    .isPostalCode('any').withMessage('Please enter a valid zipcode')
    .trim()
];

const signInValidation = [ 
    body('email')
    .not().isEmpty().withMessage("email is required")
    .trim()
    .normalizeEmail(),

    body('password')
    .not().isEmpty().withMessage("password is required")
    .trim()
]

const updateUserValidation = [
    body('username')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters")
    .escape(),

    body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),

    body('phone')
    .optional()
    .trim()
    .isMobilePhone().withMessage('Please enter a valid phone number')
    .isLength({ min: 10, max: 15 }).withMessage('Phone number must be between 10 to 15 digits'),
    
    body('address.country')
    .optional()
    .isString().withMessage('Country must be a valid string')
    .trim()
    .escape(),

    body('address.city')
    .optional()
    .isString().withMessage('City must be a valid string')
    .trim()
    .escape(),

    body('address.street')
    .optional()
    .isString().withMessage('street must be a valid string')
    .trim()
    .escape(),

    body('address.zipcode')
    .optional()
    .isPostalCode('any').withMessage('Please enter a valid zipcode')
    .trim(),

    param("id").not().isEmpty().withMessage("User ID is required")
    .isMongoId().withMessage('Invalid User ID format')
]
const deleteUserValidation = [
    param("id")
    .not().isEmpty().withMessage("User ID is required")
    .isMongoId().withMessage('Invalid User ID format')
]

const emailForResetValidation = [
    body("email").not().isEmpty().withMessage("email required")
    .isEmail().withMessage('Please provide a valid email')
]
const verifyOTPAndResetPasswordValidation = [
    body("email")
    .not().isEmpty().withMessage("email required")
    .isEmail().withMessage('Please provide a valid email')
    .trim(),

    body("otp")
    .not().isEmpty().withMessage("OTP is required"),


    body('newPassword')
    .not()
    .isEmpty().withMessage("password is required")
    .trim()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[\W]/).withMessage('Password must contain at least one special character'),
]




module.exports = {
    registerVaildation,
    signInValidation,
    updateUserValidation,
    deleteUserValidation,
    emailForResetValidation,
    verifyOTPAndResetPasswordValidation
}