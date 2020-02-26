const express = require("express");
const login = require("./routes/loginroutes");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const loginroutes = require("./routes/loginroutes");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", loginroutes);
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.get("/", function (req, res) {
  res.render("login");
});
app.get("/overview", function (req, res) {
  res.render("infectionOverview");
});
app.get("/animation", function (req, res) {
  res.render("animation");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
