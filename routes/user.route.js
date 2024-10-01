const express = require('express');
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator,
} = require('../util/validators/user.validator');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
} = require('../controllers/user.controller');

const auth = require('../controllers/Auth.controller');

const router = express.Router();

router.use(auth.protect);

router.get('/getMe', getLoggedUserData, getUser);
router.put('/changeMyPassword', updateLoggedUserPassword);
router.put('/updateMe', updateLoggedUserValidator, updateLoggedUserData);
router.delete('/deleteMe', deleteLoggedUserData);

// Admin
router.use(auth.allowedTo('admin', 'manager'));
router.put(
  '/changePassword/:id',
  changeUserPasswordValidator,
  changeUserPassword
);

// User
router
  .route('/')
  .get(getUsers)
  .post( createUserValidator, createUser);
router
  .route('/:id')
  .get(getUserValidator, getUser)
  .put( updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;

//uploadUserImage, resizeImage,
