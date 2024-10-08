const express = require('express');
const {
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
} = require('../controllers/Auth.controller');
const { registerVaildation, emailForResetValidation, verifyOTPAndResetPasswordValidation } = require('../util/validators/user.validator');

const router = express.Router();

router.post('/signup', registerVaildation, signup);
router.post('/login', loginValidator, login);
router.post('/auth/google',authWithGoogle);
router.get('/sign-out',signOut);

router.post("/reset-password",verifyOTPAndResetPasswordValidation,validationMiddleware,verifyOTPAndResetPassword)
router.post("/send-otp",emailForResetValidation,sendOtp)


module.exports = router;