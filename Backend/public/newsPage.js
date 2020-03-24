// // AJAX show tab (not the jquery widget version)
// function doAjax(e) {
//     $(".card").attr("style", "display: block;");
//     var id = e.target.id;
//     var query = "?id=" + id;
//     $.get('/api/news' + query, function (news) {
//         $("#newsTitle").html(news.title);
//         $("#newsBody").html(news.body);
//         $("#newsImage").attr("src",news.image);
//     });
// }
// $(".nav-link").click(doAjax)
// $(".card").attr("style", "display: none;");

//      <li class="nav-item"><a class="nav-link" href="/api/news?id=1">Feb.02</a></li>
$.get("http://localhost:5000/api/newscount", function (res) {
    var count = res.count;
    for (var i = 0; i < count; i++) {
        var item = document.createElement("li");
        item.className = "nav-item";
        var link = document.createElement("a");
        link.className = "nav-link";
        link.setAttribute("href", "/api/news?id=" + i);
        link.innerHTML = "news" + i;
        item.appendChild(link);
        document.querySelector("ul.nav.nav-tabs").appendChild(item);
    }
    $("#tabs").tabs();
})

// dialog widget init
$("#message").dialog({ autoOpen: false });

function openMessage() {
    $("#message").dialog("open");
}

function closeMessage() {
    $("#message").dialog("close");
}