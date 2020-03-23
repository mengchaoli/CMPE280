const express = require("express");
const users = require("../data/users");

const router = express.Router();
const session = require("express-session");

//route to handle user registration
//test to get all of the users
router.get("/users", (req, res) => {
  res.send(users);
});
//router.post('/signup');
router.post("/signup", function(req, res) {
  var db = req.db;

  var uemail = req.body.email;
  var upassword = req.body.password;
  var ufname = req.body.first_name;
  var ulname = req.body.last_name;

  var collection = db.get("users");
  collection.insert(
    {
      id: 100, // set this all to 100 need to change in the furture
      email: uemail,
      password: upassword,
      first_name: ufname,
      last_name: ulname
    },
    function(err, doc) {
      if (err) {
        res.send("Insert failed.");
      } else {
        res.render("home");
      }
    }
  );
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
  var uemail = req.body.email; // if id should transform string to int
  var db = req.db;
  var collection = db.get("users");

  collection.find({ email: uemail }, function(err, doc) {
    if (err) {
      res.send("Find Failed");
    } else {
      console.log(doc);
      if (doc[0] === undefined) {
        return res.status(404).send("Email Wrong");
      }
      if (doc[0].password != req.body.password) {
        return res.status(404).send("Password Wrong");
      } else {
        //session
        req.session.email = req.body.email;
        res.render("home");
      }
    }
  });
});
// post delete user
router.post("/deleteuser", function(req, res) {
  var uemail = req.body.email;
  var db = req.db;
  var collection = db.get("users");

  collection.find({ email: uemail }, function(err, doc) {
    if (err) {
      res.send("Find Failed");
    } else {
      if (doc[0] === undefined) {
        res.send("User Email does not exist!");
      } else {
        collection.remove({ email: uemail }, function(err, doc) {
          if (err) {
            res.send("Delete failed");
          } else {
            res.send("Successfully deleted " + uemail);
          }
        });
      }
    }
  });
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.get("/signup", function(req, res) {
  res.render("signup");
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

// get delete user
router.get("/deleteuser", function(req, res) {
  res.render("deleteuser");
});

module.exports = router;
