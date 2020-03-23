module.exports.get_userlist = function(req, res) {
  var db = req.db;
  console.log(db);
  var collection = db.get("users");
  collection.find({}, {}, function(err, docs) {
    res.render("userlist", { userlist: docs });
  });
};
