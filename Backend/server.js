var express = require("express");
var bodyParser = require("body-parser");
var app = express();

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const users = require("./routes/loginroutes");

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

app.use("/api/users", users);

var router = express.Router();
// test route
router.get("/", function(req, res) {
  res.json({ message: "welcome to our upload module apis" });
});
//route to handle user registration
//router.post('/register', login.register);
//router.post('/login', login.login)
app.use("/api", router);
app.listen(3000);
