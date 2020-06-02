const controller = require("../Controller/ContactController");
module.exports = (routers) => {
  routers
    .route("/contact")
    .post(controller.addContacts)
    .get(controller.getAllContacts);
};
