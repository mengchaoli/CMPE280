const express = require("express");
const newsPage = require("../data/news");
const router = express.Router();

router.get("/news",function(req,res){
    var id = req.query.id;
    res.json(newsPage[id]);
})

module.exports = router;