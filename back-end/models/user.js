const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "It is reqiured"],
  },
  email: {
    type: String,
    required: [true, "It is reqiured"],
  },
  message: {
    type: String,
    required: [true, "It is reqiured"],
  },
  phone: {
    type: Number,
    required: [true, "It is reqiured"],
  },
});

const UserModel = mongoose.model("userdata", userSchema);

module.exports = UserModel;
