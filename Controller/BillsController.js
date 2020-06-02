let tab = require("../Model");
module.exports = {
  add_Bills: async (req, res, next) => {
    const data = req.body;
    let newBills = new tab.Bills({
      electricity: data.electricity,
      water: data.water,
      rentPerMonth: data.rentPerMonth,
      _userID: data._usersID,
    });
    await newBills
      .save()
      .then(async (billResult) => {
        // console.log(billResult);
        // adding the bill in the tendents bills
        await tab.Tendents.updateOne(
          { _userID: data._usersID },
          { $push: { _billsID: billResult._id } },
        )
          .then((tendentsResult) => {
            // console.log(">>>> Success", tendentsResult);
            res.json({ status: 200, message: "Success" });
          })
          .catch((err) => {
            console.log("????", err);
            res.json({ status: 400, message: "Error", Error: err });
          });
      })
      .catch((err) => {
        console.log(err);
        res.json({ status: 400, message: "Error", Error: err });
      });
  },

  get_Users_Bills: async (req, res, next) => {
    let id = req.params.id;

    // console.log(id);
    let user_Bill = await tab.Bills.find({ _userID: id });
    !user_Bill && res.json({ status: 400, message: "Error", error: user_Bill });
    user_Bill &&
      res.json({ status: 200, message: "Success", bills: user_Bill });
  },
  delete_Bill_Info: async (req, res, next) => {
    let id = req.params.id;

    let delete_bills = await tab.Bills.deleteOne({ _id: id });
    !delete_bills &&
      res.json({ status: 400, message: "Error", error: delete_bills });

    delete_bills && res.json({ status: 200, message: "Success" });
  },
  put_Users_Bill: async (req, res, next) => {
    let data = req.body;
    let new_bills = {
      $set: data,
    };
    let updateBills = await tab.Bills.updateOne({ _id: data._id }, new_bills);
    !updateBills &&
      res.json({ status: 400, message: "Error", error: updateBills });
    updateBills && res.json({ status: 200, message: "Success" });
  },
};
