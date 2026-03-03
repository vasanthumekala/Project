import { Router } from "express";
import {
  registerUser,
  loginUser,
  updateUserProfile,
  changeCurrentUserPassword,
  getCurrentUser,
  updateAccoutDetails,
  logoutUser,
  makeAdmin,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/register").post(upload.single("profileImage"), registerUser);
router.route("/login").post(loginUser);

//secure routes
router.route("/logout").get(verifyJWT, logoutUser);
router
  .route("/profileImage")
  .patch(upload.single("profileImage"), verifyJWT, updateUserProfile);
router.route("/updatePassword").patch(verifyJWT, changeCurrentUserPassword);
router.route("/userDetails").get(verifyJWT, getCurrentUser);
router.route("/updateAccount").patch(verifyJWT, updateAccoutDetails);
router.route("/makeAdmin").post(makeAdmin);

export default router;
