const express = require("express");
const router = express.Router();
const modelMain = require("../models/modelMain");

router.get("/userlist", modelMain.get_userlist);

module.exports = router;
