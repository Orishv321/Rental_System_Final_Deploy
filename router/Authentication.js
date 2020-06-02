const controller = require("../Controller/AuthenticationController");
module.exports = (routers) => {
  routers.route("/newUser").post(controller.addNewUsers);
  routers.route("/newUser/login").post(controller.findUsers);
  routers.route("/newUser/reAuth").post(controller.reAuth);
};
