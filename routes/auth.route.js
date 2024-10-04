const express = require('express');
const {
  signupValidator,
  loginValidator,
} = require('../util/validators/auth.validator');
const validationMiddleware  = require('../middleware/validator.middleware');

const {
  signup,
  login,
  authWithGoogle,
  signOut,
  sendOtp,
  verifyOTPAndResetPassword,
  verifyOTPAndResetPasswordValidation,
} = require('../controllers/Auth.controller');
const { registerVaildation } = require('../util/validators/user.validator');

const router = express.Router();

router.post('/signup', registerVaildation, signup);
router.post('/login', loginValidator, login);
router.post('/auth/google',authWithGoogle);
router.get('/sign-out',signOut);

// router.post("/reset-password",verifyOTPAndResetPasswordValidation,verifyOTPAndResetPassword)
// router.post("/send-otp",emailForResetValidation,sendOtp)


module.exports = router;