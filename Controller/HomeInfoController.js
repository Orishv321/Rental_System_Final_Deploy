let tab = require("../Model");
module.exports = {
  getAllHomes: async (req, res, next) => {
    let getAllHome = await tab.HomeInfo.find();
    getAllHome &&
      res.json({ status: 200, message: "Success", allHomes: getAllHome });
    !getAllHome &&
      res.json({ status: 400, message: "Error", error: getAllHome });
  },
  addHomeInfo: async (req, res, next) => {
    const data = req.body;
    // console.log(data);
    let addNewHomeInfo = new tab.HomeInfo(data);
    await addNewHomeInfo
      .save()
      .then((result) => {
        tab.HomeOwners.findByIdAndUpdate();
        res.json({ status: 200, message: "Success" });
      })
      .catch((err) => {
        console.log(err);
        res.json({ status: 400, message: "Error", error: err });
      });
  },
  findUsers_HomeInfo: async (req, res, next) => {
    //requires home Ownews id  to show
    const homeOwnersId = req.params.id;
    let userHome = await tab.HomeInfo.find({
      _homeOwnersID: homeOwnersId,
    });
    !userHome &&
      res.json({ status: 400, message: "No Home Added", error: userHome });
    userHome && res.json({ status: 200, message: "Success", data: userHome });
  },

  deleteHomeInfo: async (req, res, next) => {
    //requires home id

    const homeId = req.params.id;
    // console.log(homeId);
    await tab.HomeInfo.deleteOne({ _id: homeId })
      .then((result) => {
        // console.log(result);
        res.json({ status: 200, message: "Success" });
      })
      .catch((err) => {
        console.log(err);
        res.json({ status: 400, message: "Error", error: err });
      });
  },
  update_HomeInfo: async (req, res, next) => {
    let data = req.body;
    let newHomeInfo = {
      $set: data,
    };
    await tab.HomeInfo.updateOne(
      { _id: req.params.id },
      newHomeInfo,
      (err, result) => {
        if (!err && result) {
          // console.log(">>>>>", result);
          res.json({ status: 200, message: "Success" });
        } else {
          console.log("???", err);
          res.json({ status: 400, message: "Error", error: err });
        }
      },
    );
  },
};
