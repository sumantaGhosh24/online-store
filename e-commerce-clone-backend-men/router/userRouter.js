import express from "express";

import {userCtrl} from "../controllers/index.js";
import {auth, authAdmin, checkValidUserOrAdmin} from "../middleware/index.js";

const router = express.Router();

// register user
router.post("/register", userCtrl.register);

// add user data
router.post("/user-data", userCtrl.userData);

// add user address
router.post("/user-address", userCtrl.userAddress);

// login user
router.post("/login", userCtrl.login);

// login verify
router.post("/login-verify", userCtrl.loginVerify);

// forgot password
router.post("/forgot-password", userCtrl.forgotPassword);

// confirm forgot password
router.post("/confirm-forgot-password", userCtrl.confirmForgotPassword);

// reset password
router.post("/reset-password", checkValidUserOrAdmin, userCtrl.resetPassword);

// verify register
router.get("/register-verify", userCtrl.registerVerify);

// get all users
router.get("/users", auth, authAdmin, userCtrl.getUsers);

// get user
router.get("/user/:id", auth, checkValidUserOrAdmin, userCtrl.getUser);

// logout user
router.get("/logout", userCtrl.logout);

// get refresh token
router.get("/refresh_token", userCtrl.refresh_token);

// get cart
router.get("/getcart", auth, userCtrl.getCart);

// update user
router.put("/user/:id", auth, checkValidUserOrAdmin, userCtrl.updateUser);

// update user data
router.put("/user-data/:id", checkValidUserOrAdmin, userCtrl.userDataUpdate);

// update user address
router.put("/user-data/:id", checkValidUserOrAdmin, userCtrl.userAddressUpdate);

// add to cart
router.patch("/addcart", auth, userCtrl.addCart);

// delete user
router.delete("/user/:id", auth, checkValidUserOrAdmin, userCtrl.deleteUser);

export default router;
