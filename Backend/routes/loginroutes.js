const express = require("express");
const users = require("../data/users");

const router = express.Router();
const session = require("express-session");
const bodyparser = require("body-parser");

//route to handle user registration
//test to get all of the users
router.get("/users", (req, res) => {
  res.send(users);
});
//router.post('/register', login.register);
router.post("/register", function(req, res) {
  const user = {
    id: users.length,
    email: req.body.email,
    password: req.body.password
  };
  users.push(user);
  res.send(user);
});

router.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

//router.post('/login', login.login)
router.post("/login", function(req, res) {
  const user = users.find(c => c.email === req.body.email);
  if (!user) return res.status(404).send("Email Wrong");
  if (user.password != req.body.password)
    return res.status(404).send("Password Wrong");

  //session
  req.session.email = req.body.email;
  res.render("home");
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.get("/home", function(req, res) {
  if (req.session.email) {
    res.render("home", { email: req.session.email });
  } else {
    res.redirect("login");
  }
});

router.get("/logout", function(req, res) {
  req.session.email = null;
  res.redirect("login");
});

module.exports = router;
