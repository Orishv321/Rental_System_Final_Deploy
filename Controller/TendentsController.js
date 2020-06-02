const tab = require("../Model");
module.exports = {
  get_Home_Tendents: async (req, res, next) => {
    let id = req.params.id;
    // console.log(id);

    await tab.HomeInfo.findOne({ _id: id })
      .then(async (tendentsResult) => {
        await tab.Users.find({
          _id: {
            $in: [...tendentsResult._tendentsUserID],
          },
        })
          .then((indTendents) => {
            // console.log(res);
            res.json({
              status: 200,
              message: "Success",
              tenUsers: indTendents,
            });
          })
          .catch((err) => {
            console.log(err);
            res.json({ status: 400, message: "Error", error: err });
          });
      })
      .catch((err) => {
        console.log(err);
        res.json({ status: 400, message: "Error", error: err });
      });
  },

  get_AllMyTendents: async (req, res, next) => {
    const id = req.params.id;

    let tendentsIds = await tab.Tendents.find({ _homeOwnerID: id });
    !tendentsIds &&
      res.json({ status: 404, message: "Invalid Users", error: tendentsIds });

    // console.log(tendentsIds);
    let allTendents = await tab.Users.find({
      _id: { $in: [...tendentsIds.map((td) => td._userID)] },
    });
    !allTendents &&
      res.json({ status: 404, message: "Invalid Users", error: allTendents });

    allTendents &&
      res.json({ status: 200, message: "Success", yourUsers: allTendents });
    //  console.log(allTendents);
  },

  edit_Tendents_info: async (req, res, next) => {
    let data = req.body;

    let newUserInfo = {
      $set: data,
    };
    await tab.Users.updateOne({ _id: data._id }, newUserInfo, (err, result) => {
      if (!err && result) {
        res.json({ status: 200, message: "Success" });
      } else {
        res.json({ status: 404, message: "Error" });
      }
    });
  },
  delete_Tendents_info: async (req, res, next) => {
    //tendents id
    let id = req.params.id;
    //1 delete tenedents
    //2 delete the data form the home info
    //3 delete the data from the users

    //finding the tendests adn saving the information
    let find_tendents = await tab.Tendents.findOne({ _userID: id });
    !find_tendents &&
      res.json({ status: 400, message: "Invalid Users", error: find_tendents });
    let tendentsTabData = find_tendents;
    //1
    let tendentsDelete = await tab.Tendents.deleteOne({ _userID: id });
    !tendentsDelete &&
      res.json({ status: 400, message: "Error", error: tendentsDelete });
    //2
    let homeInfoDelete = await tab.HomeInfo.updateOne(
      { _id: tendentsTabData._homeInfoID },
      { $pull: { _tendentsUserID: tendentsTabData._userID } },
    );
    !homeInfoDelete &&
      res.json({ status: 400, message: "Error", error: homeInfoDelete });
    //3
    let deleteUsers = await tab.Users.deleteOne({ _id: id });
    !deleteUsers &&
      res.json({ status: 400, message: "Error", error: deleteUsers });
    tendentsDelete &&
      homeInfoDelete &&
      deleteUsers &&
      res.json({ status: 200, message: "Success" });
  },
};
