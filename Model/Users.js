const mongoose = require("mongoose");
const Users = mongoose.Schema({
  name: { type: String, require: true, min: 3 },
  email: { type: String, require: true },
  phoneNo: { type: String, require: true, min: 10, max: 10 },
  userName: { type: String, require: true, min: 6, max: 16, unique: true },
  password: { type: String, require: true, min: 6, max: 16 },
  userType: { type: Number, require: true },
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Users", Users);
