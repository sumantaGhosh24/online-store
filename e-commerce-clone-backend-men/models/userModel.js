const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    userData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserData",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAddress",
    },
    cart: {
      type: Array,
      product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
      quantity: {type: Number},
    },
    status: {
      type: String,
      default: "inactive",
    },
    role: {
      type: Number,
      default: 0,
    },
    root: {
      type: Number,
      default: 0,
    },
  },
  {timestamp: true}
);

userSchema.index({email: "text", mobileNumber: "text"});

const User = mongoose.model("User", userSchema);

User.createIndexes({email: "text", mobileNumber: "text"});

module.exports = User;
