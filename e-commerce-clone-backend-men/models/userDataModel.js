const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    image: {
      type: Object,
      default:
        "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1648527265/fakeapi/vcu0dunmmyxjrdqjuxvy.jpg",
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    twoStepVerification: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {timestamps: true}
);

userDataSchema.index({username: "text", firstName: "text", lastName: "text"});

const UserData = mongoose.model("UserData", userDataSchema);

UserData.createIndexes({username: "text", firstName: "text", lastName: "text"});

module.exports = UserData;
