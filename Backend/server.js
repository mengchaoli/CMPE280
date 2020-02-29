const express = require("express");
const login = require("./routes/loginroutes");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const loginroutes = require("./routes/loginroutes");
const data_for_date_picker = require("./public/data_for_date_picker");

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
app.use("/api", loginroutes);
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
app.get("/date_picker", function(req,res){
  res.render("date_picker_widget");
})


// router for date_picker widget
app.post("/detailed_daily_info", function(req, res){
  // get data from form and change its format
  var date = req.body.date;
  int_date = parseInt(date.slice(6) + date.slice(0,2) + date.slice(3,5));


  var data_of_specified_day = data_for_date_picker.filter(a => a["date"] === int_date);
  console.log(data_of_specified_day);
  var confirmed = data_of_specified_day[0].number;
  var suspect = data_of_specified_day[1].number;
  var dead = data_of_specified_day[2].number;
  var heal = data_of_specified_day[3].number;

  //redirect back to date_picker_widget page
  res.render("date_picker_widget",{date:date, confirmed:confirmed, suspect:suspect, dead:dead,heal:heal});
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
