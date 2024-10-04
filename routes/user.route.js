const express = require("express");
const {
  getUserValidator,
  deleteUserValidation,
  changeUserPasswordValidator,
  updateUserValidation,
} = require("../util/validators/user.validator");

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
} = require("../controllers/user.controller");

const auth = require("../controllers/Auth.controller");
const validationMiddleware = require("../middleware/validator.middleware");

const router = express.Router();

router.use(auth.protect);
router.get("/getMe", getLoggedUserData, getUser);
router.put("/changeMyPassword", updateLoggedUserPassword);
router.put("/updateMe", updateUserValidation, updateLoggedUserData);
router.delete("/deleteMe", deleteLoggedUserData);

// // Admin
router.use(auth.allowedTo("admin", "seller"));
router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);

// User
router.route("/").get(auth.allowedTo("admin"), getUsers);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  // .put( updateUserValidation, updateUser)
  .delete(deleteUserValidation, deleteUser);

router.put(
  "/update/:id",
  auth.protect,
  updateUserValidation,
  validationMiddleware,
  updateUser
);
router.delete(
  "/delete/:id",
  auth.protect,
  deleteUserValidation,
  validationMiddleware,
  deleteUser
);

module.exports = router;
