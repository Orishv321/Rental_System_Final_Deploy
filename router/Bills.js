const controller = require("../Controller/BillsController");

module.exports = (routers) => {
  routers
    .route("/bills/:id")
    .post(controller.add_Bills)
    .get(controller.get_Users_Bills)
    .delete(controller.delete_Bill_Info)
    .put(controller.put_Users_Bill);
};
