window.addEventListener('load', function () {
    var
        img = new Image,
        ctx = document.getElementById('myCanvas').getContext('2d');

    img.src = './assets/Stay-Strong-Logo-1.jpg';
    img.addEventListener('load', function () {

        var interval = setInterval(function () {
            var x = 0, y = 0;

            return function () {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.drawImage(img, x, y);

                x += 1;
                if (x > ctx.canvas.width) {
                    x = 0;
                }
            };
        }(), 1000 / 40);
    }, false);
}, false);

$(init);
function init(){
    $("#myCanvas").resizable();
    $("#myCanvas").draggable();
    $("#myCanvas").droppable();

}