const express = require("express");
const data_for_date_picker = require("../data/data_for_date_picker");

const router = express.Router();

// router for date_picker widget
router.post("/", function(req, res) {
  // get data from form and change its format
  var date = req.body.date;
  int_date = parseInt(date.slice(6) + date.slice(0, 2) + date.slice(3, 5));

  console.log(int_date);
  // set the min and max boundary of date
  const min_date = 20200112;
  const max_date = 20200227;
  // exception
  if (int_date <= min_date || int_date >= max_date) {
    return res
      .status(404)
      .send("Please choose date between 20200113 and 20200226");
  }

  // var data_of_specified_day = data_for_date_picker.filter(
  //   a => a["date"] === int_date
  // );
  // console.log(data_of_specified_day);
  var db = req.db;
  var collection = db.get("datepicker");

  collection.find({ date: int_date }, function(err, doc) {
    if (err) {
      res.send("ERROR: Date error");
    } else {
      var confirmed = doc[0].number;
      var suspect = doc[1].number;
      var dead = doc[2].number;
      var heal = doc[3].number;
      //redirect back to date_picker_widget page
      res.render("date_picker_widget", {
        date: date,
        confirmed: confirmed,
        suspect: suspect,
        dead: dead,
        heal: heal
      });
    }
  });
});

module.exports = router;
