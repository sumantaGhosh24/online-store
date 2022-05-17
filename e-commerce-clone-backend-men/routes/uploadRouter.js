const router = require("express").Router();

const uploadCtrl = require("../controllers/uploadCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const checkValidUserOrAdmin = require("../middleware/checkValidUserOrAdmin");

router.post("/upload", auth, uploadCtrl.uploadImage);

router.post("/uploads", authAdmin, uploadCtrl.uploadImages);

router.post("/destroy", checkValidUserOrAdmin, uploadCtrl.deleteImage);

module.exports = router;
