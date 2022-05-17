const mongoose = require("mongoose");

const userAddressSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      require: true,
      trim: true,
    },
    state: {
      type: String,
      require: true,
      trim: true,
    },
    country: {
      type: String,
      require: true,
      trim: true,
    },
    zip: {
      type: Number,
      require: true,
      trim: true,
    },
    addressline1: {
      type: String,
      require: true,
      trim: true,
    },
    addressline2: {
      type: String,
      trim: true,
    },
  },
  {timestamps: true}
);

const UserAddress = mongoose.model("UserAddress", userAddressSchema);

module.exports = UserAddress;
