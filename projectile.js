import {EQUATIONS} from "./equations.js";

var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext('2d'); // 720 x 1080
var framerate = 60;

const STROKE_SIZE = [165, 55];
const STROKE_HORIZONTAL_POS = 880;
const SPACING = 100;
const INITIAL_STROKE_HEIGHT = 60;
const TEXT_HORIZONTAL_POS = 900;

// x, y, width(rightwards), height(downwards)
const STROKE_POSITION = {
    S: [STROKE_HORIZONTAL_POS, INITIAL_STROKE_HEIGHT, ...STROKE_SIZE],
    U: [STROKE_HORIZONTAL_POS, INITIAL_STROKE_HEIGHT+(SPACING), ...STROKE_SIZE],
    V: [STROKE_HORIZONTAL_POS, INITIAL_STROKE_HEIGHT+(SPACING*2), ...STROKE_SIZE],
    A: [STROKE_HORIZONTAL_POS, INITIAL_STROKE_HEIGHT+(SPACING*3), ...STROKE_SIZE],
    T: [STROKE_HORIZONTAL_POS, INITIAL_STROKE_HEIGHT+(SPACING*4), ...STROKE_SIZE]
}

const DEFAULT_COLOR = "black";
var sColour = "black";
var uColour = "black";
var vColour = "black";
var aColour = "black";
var tColour = "black";

var sFocus = false;
var uFocus = false;
var vFocus = false;
var aFocus = false;
var tFocus = false;


setInterval( () => {
    equationDraw()
}, 1000/framerate ) // 1/ frame rate means the time for n frames per second to happen

// Vertical projectile Motion

function calculatMousPos(evt) { // calculate mouse position
    var rect = canvas.getBoundingClientRect()
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX, y: mouseY
    }
}

function SuvatMousePosHandling(e) {
    canvas.style.cursor = "default"
    var {x, y} = calculatMousPos(e);

    for (var i in STROKE_POSITION) {
        var pos = STROKE_POSITION[i]
        if (
            x >= pos[0] && y >= pos[1] && 
            x <= pos[0]+pos[2] &&
            y <= pos[1]+pos[3]
        ) {
            canvas.style.cursor = "text"
            return i
        }
    }
}

function keyInput(label, x, y) {
    console.log("hello")
    document.getElementsByTagName("body")[0].onkeydown = (e) => {
        e.key
    }
}

canvas.onmousemove = (e) => { // PADDLE CONTROLLED BY MOUSE CODE
    var box = SuvatMousePosHandling(e)
    sColour = "black";
    uColour = "black";
    vColour = "black";
    aColour = "black";
    tColour = "black";
    if (box=="S") {
        sColour = "blue";
    } else if (box=="U") {
        uColour = "blue";
    } else if (box=="V") {
        vColour = "blue";
    } else if (box=="A") {
        aColour = "blue";
    } else if (box=="T") {
        tColour = "blue";
    }

    if (sFocus === true) {
        sColour = "blue"
    } else if (uFocus === true) {
        uColour = "blue"
    } else if (vFocus === true) {
        vColour = "blue"
    } else if (aFocus === true) {
        aColour = "blue"
    } else if (tFocus === true) {
        tColour = "blue"
    }
}

canvas.onclick = (e) => {
    var box = SuvatMousePosHandling(e);
    sFocus = false;
    uFocus = false;
    vFocus = false;
    aFocus = false;
    tFocus = false;
    if (box=="S") {
        sFocus = true;
        keyInput("S: ", TEXT_HORIZONTAL_POS, SPACING*1)
    } else if (box=="U") {
        uFocus = true;
        keyInput("U: ", TEXT_HORIZONTAL_POS, SPACING*2)
    } else if (box=="V") {
        vFocus = true;
        keyInput("V: ", TEXT_HORIZONTAL_POS, SPACING*3)
    } else if (box=="A") {
        aFocus = true;
        keyInput("A: ", TEXT_HORIZONTAL_POS, SPACING*4)
    } else if (box=="T") {
        tFocus = true;
        keyInput("T: ", TEXT_HORIZONTAL_POS, SPACING*5)
    }
}

function movement() {

}

function equationDraw() {
    // console.log("draw")
    ctx.font = "40px Arial";
    ctx.fillStyle = DEFAULT_COLOR;
    ctx.strokeStyle = sColour;
    ctx.strokeRect(...STROKE_POSITION.S);
    ctx.fillText("S: ", TEXT_HORIZONTAL_POS, SPACING*1);

    ctx.strokeStyle  = uColour;
    ctx.strokeRect(...STROKE_POSITION.U);
    ctx.fillText("U: ", TEXT_HORIZONTAL_POS, SPACING*2);

    ctx.strokeStyle  = vColour;
    ctx.strokeRect(...STROKE_POSITION.V);
    ctx.fillText("V: ", TEXT_HORIZONTAL_POS, SPACING*3);
    
    ctx.strokeStyle  = aColour;
    ctx.strokeRect(...STROKE_POSITION.A);
    ctx.fillText("A: ", TEXT_HORIZONTAL_POS, SPACING*4);
    
    ctx.strokeStyle  = tColour;
    ctx.strokeRect(...STROKE_POSITION.T);
    ctx.fillText("T: ", TEXT_HORIZONTAL_POS, SPACING*5);
}
