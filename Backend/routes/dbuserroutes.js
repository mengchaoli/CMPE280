const express = require("express");
const router = express.Router();
const modelMain = require("../models/modelMain");

router.get("/userlist", modelMain.get_userlist);
router.get("/userlist/:user_email", modelMain.get_showuser);
// router.get("/newuser", function(req, res) {
//   res.render("newuser");
// });
// router.post("/adduser", modelMain.post_adduser);
// router.get("/deleteuser/:user_email", function(req, res) {
//   var uemail = req.params.user_email;
//   res.render("deleteuser", { useremail: uemail });
// });
// router.post("/deleteuser/:user_email", modelMain.post_deleteuser);

module.exports = router;
