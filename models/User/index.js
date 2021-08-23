/**
 *   Model Users
 **/

const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: "user",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  actived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Users", UserSchema);
