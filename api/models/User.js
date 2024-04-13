const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    q1: {
      type: Boolean,
      required: true,
    },
    q2: {
      type: Boolean,
      required: true,
    },
    q3: {
      type: String,
      required: true,
    },        
  },
);
const User = mongoose.model("User", userSchema);
module.exports = User;