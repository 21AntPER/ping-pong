import {SUVAT_EQUATIONS} from "./equations.js";
import {drawInput, programInput, colorCircle, Button} from "./constructors.js"


export var canvas = document.getElementById("gameCanvas");
export var ctx = canvas.getContext('2d'); // 720 x 1080

const INPUT_SPACING = 100;

var ballHeight = 720, ballSpeed = 0, ballAcceleration = 9.81;
var horizontalData = {horizontals: undefined, horizontalv: undefined, horizontalt: undefined}
var verticalData = {s: undefined, u: undefined, v: undefined, a:undefined, t: undefined}

// (text="", fontSize, fontFamily, x, y, width, vPadding, outline="blue", border="black", color="black", placeholder="")
var VerticalInputs = {s: undefined, u: undefined, v: undefined, a: undefined, t: undefined}
var HorizontalInputs = {horizontals: undefined, horizontalv: undefined, horizontalt: undefined}

let i = 0;
for (var ppty in VerticalInputs) {
    VerticalInputs[ppty] = new drawInput(
        "", //text
        40, //font size
        "Arial", // font family
        880, // horizontal pos
        80+(INPUT_SPACING*i), // vertical position
        165, 20, // width and padding
        )
    VerticalInputs[ppty].label = `${ppty.toUpperCase()}: `
    i += 1
}
VerticalInputs["a"].input = false;
VerticalInputs["a"].value = "9.81"
i = 0;
for (var ppty in HorizontalInputs) {
    HorizontalInputs[ppty] = new drawInput(
        "", //text
        40, //font size
        "Arial", // font family
        675, // horizontal pos
        80+(INPUT_SPACING*i), // vertical position
        165, 20, // width and padding
        )
    HorizontalInputs[ppty].label = `${ppty[ppty.length-1].toUpperCase()}: `
    i += 1
}
var playSimulationButton = new Button(() => {
    let verticalVariables = ""
    let verticalVariableValues = []
    let missingVerticalVariables = []
    for (let i in HorizontalInputs) {
        let value = HorizontalInputs[i].value
        if (value==="") {
            horizontalData[i] = value
        } else {
            horizontalData[i] = Number(value)
        }
    }
    for (let i in VerticalInputs) {
        let value = VerticalInputs[i].value;
        if (value==="") {
            missingVerticalVariables.push(i)
        } else {
            verticalVariables += i
            verticalVariableValues.push(Number(value))
            verticalData[i] = Number(value)
        }
    }
    for (let i of missingVerticalVariables) {
        console.log(verticalVariables)
        console.log(i)
        verticalData[i] = SUVAT_EQUATIONS[i][verticalVariables](verticalVariableValues[0], verticalVariableValues[1], verticalVariableValues[2])
    }
    ballHeight -= verticalData["s"]
    ballSpeed = verticalData["u"]
}, 880, 600, 165, 20, "Play")

setInterval( () => {
    draw()
    drawBall();
    animate();
}, 100 ) // 1/ frame rate means the time for n frames per second to happen

function draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (var ppty in VerticalInputs) {
        VerticalInputs[ppty].draw()
    }
    for (var ppty in HorizontalInputs) {
        HorizontalInputs[ppty].draw()
    }
    ctx.fillStyle = "black";
    ctx.fillText("Horizontal", 667, 60)
    ctx.fillText("Vertical", 893, 60)
    playSimulationButton.draw()
}

function animate() {
    if (ballHeight <= 720) {
        ballHeight += (ballSpeed/10)
        ballSpeed += (ballAcceleration/10)
    }
}

function drawBall() {
    colorCircle(250, ballHeight, 15, "red")
}

programInput({...HorizontalInputs, ...VerticalInputs, playSimulationButton})