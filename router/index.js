const authentication = require("./Authentication");
const contact = require("./Contact");
const homeInfo = require("./HomeInfo");
const tendents = require("./Tendents");
const bills = require("./Bills");
module.exports = (router) => {
  authentication(router);
  contact(router);
  homeInfo(router);
  tendents(router);
  bills(router);
  return router;
};
