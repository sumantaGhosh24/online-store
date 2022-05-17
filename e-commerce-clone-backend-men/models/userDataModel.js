const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: Object,
      default:
        "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1648527265/fakeapi/vcu0dunmmyxjrdqjuxvy.jpg",
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;
