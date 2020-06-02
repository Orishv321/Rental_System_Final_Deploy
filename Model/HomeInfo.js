const mongoose = require("mongoose");
const HomeInfo = mongoose.Schema({
  total_rooms: {
    type: Number,
    required: true,
  },
  room_size: {
    type: String,
    required: true,
  },
  bathroom: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  parking: {
    type: String,
    required: true,
  },
  room_availability: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    require: true,
    max: 10,
    min: 10,
  },
  //The users Id is only form the tendents Id not the home owners id
  _tendentsUserID: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Users",
    required: false,
  },
  _homeOwnersID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HomeOwners",
    required: true,
  },
  // images_ID: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: "Images",
  // },
});
module.exports = mongoose.model("HomeInfo", HomeInfo);
// 5eca4264113e562990332c91
