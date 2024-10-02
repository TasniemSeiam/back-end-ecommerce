const express = require('express');
const { authWithGoogle, getAllUsers, register, signIn, updateUser, deleteUser, signOut, sendOtp, verifyOTPAndResetPassword } = require('../controllers/user.controller.js');
  const verifyToken = require('./../middleWare/verifyToken.js');
  const { registerVaildation,signInValidation, updateUserValidation, deleteUserValidation, emailForResetValidation, verifyOTPAndResetPasswordValidation} = require('../validator/userValidation.js');
  const validate = require('../middleWare/validationErrors.js');

const router = express.Router()

router.get('/',getAllUsers)
router.post('/register',registerVaildation,validate,register)
router.post('/sign-in',signInValidation,validate,signIn) 
router.post('/auth/google',authWithGoogle) // sign in with google
router.put('/update/:id',verifyToken,updateUserValidation,validate,updateUser) 
router.delete('/delete/:id',verifyToken ,deleteUserValidation,validate,deleteUser) 
router.get('/sign-out',signOut) 

router.post("/send-otp",emailForResetValidation,validate,sendOtp)
router.post("/reset-password",verifyOTPAndResetPasswordValidation,validate,verifyOTPAndResetPassword)

 module.exports = router;  