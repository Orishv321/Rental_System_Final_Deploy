const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const routers = require("./router");
const connect = require("./Connect/connect");
const path = require("path");
//using all dependencyes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//call for the router
app.use("/api/v/", routers(router));

//SERVER STATIC ASSETS IF IN PRODUCTION

if (process.env.NODE_ENV === "production") {
  //set A static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 3003;
// const PORT = 3003;

app.listen(PORT, () => console.log(`Server is now in port no ${PORT}`));
