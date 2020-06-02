const tab = require("../Model");
module.exports = {
  addContacts: async (req, res, next) => {
    const data = req.body;
    let addContacts = new tab.Contact(data);
    await addContacts
      .save()
      .then((result) => {
        res.json({ status: 200, message: "Success" });
      })
      .catch((err) => {
        console.log(err);
        res.json({ status: 400, error_msg: "Error", error: err });
      });
  },
  getAllContacts: async (req, res, next) => {
    let contacts = await tab.Contact.find();
    !contacts && res.json({ status: 400, message: "No Contacts" });
    contacts &&
      res.json({ status: 200, message: "Success", contacts: contacts });
  },
};
