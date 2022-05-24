const router = require("express").Router();

const orderCtrl = require("../controllers/orderCtrl");
const auth = require("../middleware/auth");
const checkValidUserOrAdmin = require("../middleware/checkValidUserOrAdmin");

// get orders
router.get("/orders", auth, checkValidUserOrAdmin, orderCtrl.getOrders);

// create order
router.post("/order", auth, orderCtrl.createOrder);

// get order & update order & delete order
router
  .route("/order/:id")
  .get(auth, checkValidUserOrAdmin, orderCtrl.getOrder)
  .put(auth, checkValidUserOrAdmin, orderCtrl.updateOrder)
  .delete(auth, checkValidUserOrAdmin, orderCtrl.deleteOrder);

// get user order
router.get("/order", auth, checkValidUserOrAdmin, orderCtrl.getUserOrder);

module.exports = router;
