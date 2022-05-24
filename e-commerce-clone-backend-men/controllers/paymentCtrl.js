const Order = require("../models/orderModel");

const paymentCtrl = {
  test: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
};

module.exports = paymentCtrl;
