import mongoose from "mongoose";

const userAddressSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    zip: {
      type: Number,
      trim: true,
    },
    addressline1: {
      type: String,
      trim: true,
    },
    addressline2: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {timestamps: true}
);

const UserAddress = mongoose.model("UserAddress", userAddressSchema);

export default UserAddress;
