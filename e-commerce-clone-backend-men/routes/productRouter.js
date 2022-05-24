const router = require("express").Router();

const productCtrl = require("../controllers/productCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

// get all products
router.get("/products", productCtrl.getProducts);

// create product
router.post("/product", auth, authAdmin, productCtrl.createProduct);

// get product & update product & delete product & add image
router
  .route("/product/:id")
  .get(productCtrl.getProduct)
  .put(auth, authAdmin, productCtrl.updateProduct)
  .delete(auth, authAdmin, productCtrl.deleteProduct)
  .patch(auth, authAdmin, productCtrl.addImage);

module.exports = router;
