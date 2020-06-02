const mongoose = require("mongoose");

const Tendents = mongoose.Schema({
  _billsID: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Bills",
    require: false,
  },
  _userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
  _homeOwnerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HomeOwners",
    require: true,
  },
  _homeInfoID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HomeInfo",
    require: true,
  },
});
module.exports = mongoose.model("Tendents", Tendents);
