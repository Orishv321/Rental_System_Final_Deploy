const tab = require("../Model/");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");
let error_message = (res, data) => {
  res.json({
    status: 500,
    error_message: "An error Occured Please try again",
    error: data,
  });
};
module.exports = {
  findUsers: async (req, res, next) => {
    const data = req.body;
    // console.log(data);

    let validUser = async (UsernameRes) => {
      const token = jwt.sign(
        { _id: UsernameRes._id },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "2d",
          issuer: "rental",
        },
      );
      let response_typeUser = async (req, userDetails) => {
        await res.header("rental_Token").status(200).json({
          message: "ValidUsers",
          detail: userDetails,
        });
      };
      if (UsernameRes.userType === 2) {
        let homeOwnersID = await tab.HomeOwners.findOne({
          _userID: UsernameRes._id,
        });
        let userDetails = {
          userId: UsernameRes._id,
          userName: UsernameRes.userName,
          type: UsernameRes.userType,
          homeOwnersID: homeOwnersID._id,
          token: token,
        };
        response_typeUser(req, userDetails);
      } else {
        let userDetails = {
          userId: UsernameRes._id,
          userName: UsernameRes.userName,
          type: UsernameRes.userType,
          token: token,
        };
        response_typeUser(req, userDetails);
      }
    };

    let findPassword = async (pass, UsernameRes) => {
      const passRes = await bcrypt.compare(pass, UsernameRes.password);
      !passRes &&
        res.json({ status: 401, message: "Password or UserName invalid" });
      passRes && validUser(UsernameRes);
    };
    const UsernameRes = await tab.Users.findOne({ userName: data.userName });
    !UsernameRes &&
      res.json({ status: 401, message: "UserName or Password not Defined" });
    UsernameRes && findPassword(data.password, UsernameRes);
  },

  addNewUsers: async (req, res, next) => {
    let data = req.body;
    // finding for same users
    let findUsers = await tab.Users.findOne({ userName: data.userName });
    if (findUsers) {
      res.json({ status: 400, message: "User Name exists" });
    } else {
      //for bcryption the password
      bcrypt.genSalt(5, (err, salt) => {
        bcrypt.hash(data.password, salt, (err, hash) => {
          data.password = hash;
          // console.table(data);
          const newUsers = new tab.Users({
            name: data.name,
            email: data.email,
            phoneNo: data.phoneNo,
            userName: data.userName,
            password: hash,
            userType: data.userType,
            date: data.date,
          });
          if (data.userType === 1) {
            console.log("Admin page");
          } else if (data.userType === 2) {
            console.log("Home Owners page");

            newUsers
              .save()
              .then((result) => {
                // console.log("Saved the user in user table ", result._id);
                const newHomeOwners = new tab.HomeOwners({
                  _userID: result._id,
                });
                console.log("Saving the user as home Owners");
                newHomeOwners
                  .save()
                  .then((result_homeInfo) => {
                    console.log(">>>>>inserted_All");
                    res.json({ status: 200, message: "Inserted" });
                  })
                  .catch((err) => {
                    console.log(">>>>>>Errors From new Home owners", err);
                    error_message(res, err);
                  });
              })
              .catch((err) => {
                console.log(">>>>>>>Errros form new Users", err);
                error_message(res, err);
              });
          } else if (data.userType === 3) {
            console.log("Tendents Page");
            const data = req.body;

            // console.log(">>>", data);
            // adding new Tendents
            newUsers
              .save()
              .then((userSaved) => {
                console.log(">>>>>usersAdded");

                tab.HomeInfo.updateOne(
                  { _id: data._homeInfoID },
                  { $push: { _tendentsUserID: userSaved._id } },
                )
                  .then((tenSavedHomeInfo) => {
                    console.log(">>>>User Saved in Home info ");

                    // console.log("tenSavedHomeInfo>>>>", userSaved._id);
                    // console.log(data);

                    let newTendents = new tab.Tendents({
                      _userID: userSaved._id,
                      _homeOwnerID: data._homeOwnerID,
                      _homeInfoID: data._homeInfoID,
                    });
                    // console.log(newTendents);
                    newTendents
                      .save()
                      .then((savedInTendents) => {
                        console.log("users saved in Tendents");
                        res.json({ status: 200, message: "Inserted" });
                      })
                      .catch((err) => {
                        console.log("???", err);
                        error_message(res, err);
                      });
                  })
                  .catch((err) => {
                    console.log("???", err);
                    error_message(res, err);
                  });
              })
              .catch((err) => {
                console.log("???", err);
                error_message(res, err);
              });
          } else {
            console.log("Invalid userse");
          }
        });
      });
    }
  },
  reAuth: async (req, res, next) => {
    let token = req.body.user_token;
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      // console.log(decoded);
      let id = await tab.Users.findOne({ _id: decoded._id });
      if (!id) {
        res.json({ status: 401, message: "Invalid user", error: id });
      } else {
        let userDetails = {
          userName: id.userName,
          type: id.userType,
          token: token,
        };
        await res.header("rental_Token").status(200).json({
          message: "ValidUsers",
          detail: userDetails,
        });
      }
    });
  },
};
