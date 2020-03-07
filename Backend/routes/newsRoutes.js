const express = require("express");
const newsPage = require("../data/news");
const router = express.Router();

router.get("/news",function(req,res){
    var id = req.query.id;
    var data = newsPage[id];
    res.render("news", data);
})

router.get("/newsCount", function(req, res) {
    res.json({count: newsPage.length});
});

module.exports = router;