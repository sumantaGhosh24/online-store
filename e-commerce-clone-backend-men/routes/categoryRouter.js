const router = require("express").Router();

const categoryCtrl = require("../controllers/categoryCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

// get categories & create category
router
  .route("/category")
  .get(categoryCtrl.getCategories)
  .post(auth, authAdmin, categoryCtrl.createCategory);

// update category & delete category
router
  .route("/category/:id")
  .delete(auth, authAdmin, categoryCtrl.deleteCategory)
  .put(auth, authAdmin, categoryCtrl.updateCategory);

module.exports = router;
