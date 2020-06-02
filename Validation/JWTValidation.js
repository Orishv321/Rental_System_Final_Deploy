const jwt = require("jsonwebtoken");
require("dotenv/config");
module.exports = (req, res, next) => {
  const token = req.header(process.env.JWTToken);
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Access Denied invalid user From Validation",
    });
  }
  try {
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verify;
    next();
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: "Access_Denied",
    });
  }
};
