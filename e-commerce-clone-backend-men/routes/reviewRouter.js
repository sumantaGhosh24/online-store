const router = require("express").Router();

const reviewCtrl = require("../controllers/reviewCtrl");
const auth = require("../middleware/auth");
const checkValidUserOrAdmin = require("../middleware/checkValidUserOrAdmin");

// get product reviews
router.get("/reviews/:product", reviewCtrl.getReviews);

// get review
router.get("/review/:id", reviewCtrl.getReview);

// create review
router.post("/review/:product", auth, reviewCtrl.createReview);

// update review
router.put("/review/:id", auth, checkValidUserOrAdmin, reviewCtrl.updateReview);

// delete review
router.delete(
  "/review/:id",
  auth,
  checkValidUserOrAdmin,
  reviewCtrl.deleteReview
);

module.exports = router;
