const mongoose = require("mongoose");

const FeedBack = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("FeedBack", FeedBack);
