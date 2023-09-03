const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
});

const User = mongoose.model("UserInfo", UserDetailsScehma);

module.exports = {
  User,
};
