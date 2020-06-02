const mongoose = require("mongoose");

const Images = mongoose.Schema({
  imageAddress: { type: String, required: true },
  homeInfoID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HomeInfo",
    required: true,
  },
});
module.exports = mongoose.model("Images", Images);
