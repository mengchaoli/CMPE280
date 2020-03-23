const express = require("express");
const login = require("./routes/loginroutes");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const loginroutes = require("./routes/loginroutes");
const newsroutes = require("./routes/newsRoutes");
const data_pickerroutes = require("./routes/data_pickerroutes");
// connect to mongodb
const mongo = require("mongodb");
const monk = require("monk");
var db = monk("localhost:27017/userdb");
const dbuserroutes = require("./routes/dbuserroutes.js");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// db <--> controller
app.use(function(req, res, next) {
  req.db = db;
  next();
});
app.use("/db", dbuserroutes);
app.use("/api", loginroutes);
app.use("/detailed_daily_info", data_pickerroutes);
app.use("/api", newsroutes);
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.render("login");
});
app.get("/overview", function(req, res) {
  res.render("infectionOverview");
});
app.get("/animation", function(req, res) {
  res.render("animation");
});
//direct to the date_picker page
app.get("/date_picker", function(req, res) {
  res.render("date_picker_widget");
});

app.get("/newspage", function(req, res) {
  res.render("newsPage");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
