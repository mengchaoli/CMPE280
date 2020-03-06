function doAjax(e) {
    $(".card").attr("style", "display: block;");
    var id = e.target.id;
    var query = "?id=" + id;
    $.get('/api/news' + query, function (news) {
        $("#newsTitle").html(news.title);
        $("#newsBody").html(news.body);
        $("#newsImage").attr("src",news.image);
    });
}

$(".nav-link").click(doAjax)
$(".card").attr("style", "display: none;");