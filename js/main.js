var canvas;
var ctx;

var screen;
var hiddenScreen;
var tmpScreen;

var menu;
var background;
var texture;

var keyState = [];
var mouse = {x: 0, y: 0, key: 0, wheel: 0};
var scale = 6;

var hold = false;

function main(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    menu = new Image();
    menu.src = "res/img/menu.png";
    background = new Image();
    background.src = "res/img/background.png";
    texture = new Image();
    texture.src = "res/img/textures.png";
    texture.onload = () => {
        //screen = new GameScreen();
        screen = new MainScreen();
        initEventHandlers();

        setInterval(run,10);
    }
}

function run() {
    screen.update();
    screen.display();
}

function initEventHandlers() {
    document.getElementById("canvas").onmousemove = function(e) {
        let x = e.clientX-canvas.offsetLeft;
        let y = e.clientY-canvas.offsetTop;
        if (hold && e.buttons&1) screen.onScroll((x-mouse.x)/50);
        mouse.x = x;
        mouse.y = y;
        mouse.key = e.buttons;
    }
    document.getElementById("canvas").onmousedown = function(e){
        let test = {x: e.clientX-e.target.offsetLeft, y: e.clientY-e.target.offsetTop};
        let res = [-1,-1];
        if (e.buttons && !hold) res = screen.onClick(test) || [-1,-1];
        hold = !(res[0]!= -1||res[1]!= -1);
    }
    document.getElementById("canvas").onmouseup = function(e){
        hold = false;
    }
    document.getElementById("canvas").onwheel = function(e) {
        mouse.wheel = e.deltaY>0?1:-1;
        screen.onScroll(-mouse.wheel);
    }
}

//disable scrolling while hovering above canvas
function disable(e) {
    e.preventDefault();
}
document.getElementById("canvas").onmouseover = function(){
    document.addEventListener('wheel', disable, false);
    document.addEventListener('mousedown', disable, false);
    document.addEventListener('contextmenu', disable, false);
    document.addEventListener('keydown', disable, false);
}
document.getElementById("canvas").onmouseout = function(){
    document.removeEventListener('wheel', disable, false);
    document.removeEventListener('mousedown', disable, false);
    document.removeEventListener('contextmenu', disable, false);
    document.removeEventListener('keydown', disable, false);
}

main();