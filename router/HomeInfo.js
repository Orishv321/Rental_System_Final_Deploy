const controller = require("../Controller/HomeInfoController");
module.exports = (routers) => {
  routers
    .route("/homeInfo")
    .get(controller.getAllHomes)
    .post(controller.addHomeInfo);

  //to delete , updata, and to find the home info acording to the homeOwners id
  routers
    .route("/homeInfo/:id")
    .get(controller.findUsers_HomeInfo)
    .delete(controller.deleteHomeInfo)
    .put(controller.update_HomeInfo);
};
