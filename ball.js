var canvas;
var canvasContext;

var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext('2d'); // 800 x 600
var framerate = 55;
var xBallDistance = 0;
var xBallSpeed = 5;
var yBallDistance = 0;
var yBallSpeed = 5;
var leftPaddleY = 250;
var rightPaddleY = 250;

var playerScore = 0;
var computerScore = 0;

const PADDLE_HEIGHT = 100;
const PADDLE_WEIGHT = 10;

setInterval( () => {
    movement();
    computerMovement();
    draw();
}, 1000/framerate ) // 1/ frame rate means the time for n frames per second to happen

function colorRect(leftX, topY, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(leftX, topY, width, height);
}

function calculatMousPos(evt) { // calculate mouse position
    var rect = canvas.getBoundingClientRect()
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX, y: mouseY
    }
}

function ballRest() {
    xBallDistance = canvas.width/2
    yBallDistance = canvas.height/2
    var randomInt = Math.round(Math.random()) // 0 or 1
    // console.log(randomInt)
    if (randomInt === 0 ) {
        xBallSpeed = -xBallSpeed;
    }
}

canvas.onmousemove = (e) => { // PADDLE CONTROLLED BY MOUSE CODE
    var pos = calculatMousPos(e);
    leftPaddleY = pos.y - (PADDLE_HEIGHT/2)
}

function colorCircle(leftX, topY, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath()
    ctx.arc(leftX, topY, radius, 0, 2*Math.PI, true) //x, y represents the centre
    ctx.fill()
}

function computerMovement() {
    if ((rightPaddleY + (0.5 * PADDLE_HEIGHT)) > yBallDistance+(0.2*PADDLE_HEIGHT)) {
        rightPaddleY -= 4;
    } else if ((rightPaddleY + (0.5 * PADDLE_HEIGHT)) < yBallDistance-(0.2*PADDLE_HEIGHT)) {
        rightPaddleY += 4;
    }
}

function movement() {
    // Bounce
    if (xBallDistance >= canvas.width || xBallDistance < 0) {
        xBallSpeed = -xBallSpeed;
    }
    if (yBallDistance >= canvas.height || yBallDistance < 0) {
        yBallSpeed = -yBallSpeed
    }
    //Collision Detection for left player paddle
    if ( yBallDistance <= leftPaddleY+(PADDLE_HEIGHT)+1 && 
        yBallDistance >= leftPaddleY+1 &&
        xBallDistance <= PADDLE_WEIGHT
    ) {
        ballRest();
        playerScore++
    }
    //Collision Detection for right computer paddle
    if ( yBallDistance <= rightPaddleY+(PADDLE_HEIGHT) && 
        yBallDistance >= rightPaddleY &&
        xBallDistance >= (canvas.width-PADDLE_WEIGHT)
    ) {
        ballRest();
        computerScore++
    }
    xBallDistance += xBallSpeed // Add distance to ball via the speed variable (distance per second)
    yBallDistance += yBallSpeed // Add distance to ball via the speed variable (distance per second)
}   

function draw() {
    colorRect(0, 0, canvas.width, canvas.height, "black") //background
    colorRect(0, leftPaddleY, PADDLE_WEIGHT, PADDLE_HEIGHT, "yellow") // left player paddle
    colorRect(canvas.width-PADDLE_WEIGHT, rightPaddleY, PADDLE_WEIGHT, PADDLE_HEIGHT, "white") // right computer paddle
    colorCircle(xBallDistance, yBallDistance, 10, "white") //ball
    ctx.fillText(`Score: ${playerScore} - ${computerScore}`, canvas.width/2, 50)
}