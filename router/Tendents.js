const controller = require("../Controller/TendentsController");
module.exports = (routers) => {
  //To get the users from the home info only
  routers.route("/homeId/tendents/:id").get(controller.get_Home_Tendents);
  ///T0 get all the users of the home owners
  routers.route("/homeId/homeOwners/:id").get(controller.get_AllMyTendents);
  //To edit and delete the tendents info
  routers
    .route("/tendents/:id")
    .put(controller.edit_Tendents_info)
    .delete(controller.delete_Tendents_info);
};
