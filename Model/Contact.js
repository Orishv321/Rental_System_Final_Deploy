const mongoose = require("mongoose");

const Contact = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true, min: 10 },
});
module.exports = mongoose.model("Contact", Contact);
