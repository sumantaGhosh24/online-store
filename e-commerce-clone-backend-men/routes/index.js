const uploadRouter = require("./uploadRouter");
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const categoryRouter = require("./categoryRouter");
const orderRouter = require("./orderRouter");
const reviewRouter = require("./reviewRouter");

const routes = [
  uploadRouter,
  userRouter,
  productRouter,
  categoryRouter,
  orderRouter,
  reviewRouter,
];

module.exports = routes;
