const mongoose = require("mongoose");

const HomeOwners = mongoose.Schema({
  _userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
  _tendentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tendent",
    require: true,
  },
  _feedBack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FeedBack",
    require: true,
  },
  payment: { type: Boolean, default: true },
});
module.exports = mongoose.model("HomeOwners", HomeOwners);
