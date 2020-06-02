const mongoose = require("mongoose");
const Bills = mongoose.Schema({
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
  electricity: {
    type: Number,
    require: true,
  },
  water: {
    type: Number,
    require: true,
  },
  //
  rentPerMonth: {
    type: Number,
    require: true,
  },
  paidAmt: {
    type: Number,
    require: false,
  },
  _userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
});
module.exports = mongoose.model("Bills", Bills);
