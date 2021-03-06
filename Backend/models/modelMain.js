module.exports.get_userlist = function(req, res) {
  var db = req.db;
  //   console.log(db);
  var collection = db.get("users");
  collection.find({}, {}, function(err, docs) {
    res.render("userlist", { userlist: docs });
  });
};

module.exports.get_showuser = function(req, res) {
  var uemail = req.body.email; // if id should transform string to int
  console.log(uemail);
  var db = req.db;
  var collection = db.get("users");

  collection.find({ email: uemail }, function(err, doc) {
    if (err) {
      res.send("Find failed.");
    } else {
      if (doc[0] === undefined) {
        res.send("User Email does not exist!");
      } else {
        res.render("showuser", {
          title: "Show User: " + uemail,
          mail: doc[0].email,
          fname: doc[0].first_name,
          lname: doc[0].last_name
        });
      }
    }
  });
};

// module.exports.post_adduser = function(req, res) {
//   var db = req.db;

//   var uemail = req.body.email;
//   var upassword = req.body.password;
//   var ufname = req.body.first_name;
//   var ulname = req.body.last_name;

//   var collection = db.get("users");
//   collection.insert(
//     {
//       id: 100,
//       email: uemail,
//       password: upassword,
//       first_name: ufname,
//       last_name: ulname
//     },
//     function(err, doc) {
//       if (err) {
//         res.send("Insert failed.");
//       } else {
//         res.redirect("userlist");
//       }
//     }
//   );
// };

// module.exports.post_deleteuser = function(req, res) {
//   var uemail = req.params.user_email;
//   var db = req.db;
//   var collection = db.get("users");

//   collection.remove({ email: uemail }, function(err, doc) {
//     if (err) {
//       res.send("Delete failed");
//     } else {
//       res.send("Successfully deleted " + uemail);
//     }
//   });
// };
