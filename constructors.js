import {ctx, canvas} from "./new.js"

export class drawInput {
    constructor(value="", fontSize, fontFamily, x, y, width, vPadding, outline="blue", border="black", color="black", placeholder="", label="", input=true) { // position will be an array of [x, y]
        this.value = value;
        this.placeholder = placeholder;
        this.x = x;
        this.y = y;
        this.width = width;
        this.border = border;
        this.outline = outline;
        this.color = color;
        this.vPadding = vPadding;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.focus = false;
        this.xEnd = x+width;
        this.yEnd = y+((28/40)*fontSize)+(vPadding*2);
        this.label = label;
        this.input = input;
        this.inputType = "Textbox";
    }

    draw() {
        var text = this.label + this.value;
        // console.log(text)
        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        ctx.strokeStyle = this.border;
        ctx.strokeRect(this.x, this.y, this.width, ((28/40)*this.fontSize)+(this.vPadding*2))
        if (this.placeholder != "") {
            ctx.fillStyle = "grey";
            ctx.fillText(this.label + this.placeholder, this.x+20, this.y+(this.vPadding)+((28/40)*this.fontSize));
        } else {
            ctx.fillStyle = this.color;
            ctx.fillText(text, this.x+20, this.y+(this.vPadding)+((28/40)*this.fontSize));
        }
    }
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

function MousePosHandling(e, Inputs) {
    canvas.style.cursor = "default"
    var {x, y} = calculatMousPos(e);

    for (var i in Inputs) {
        var pos = Inputs[i]
        if (
            x >= pos["x"] && y >= pos["y"] && 
            x <= pos["xEnd"] &&
            y <= pos["yEnd"] && pos["input"] === true
        ) {
            if (pos["inputType"] === "Textbox") {
                canvas.style.cursor = "text";
            } else if (pos["inputType"] === "Button") {
                canvas.style.cursor = "pointer";
            }
            return i
        }
    }
    return undefined
}

function keyInput(Inputs, ppty) {
    document.getElementsByTagName("body")[0].onkeydown = (e) => {
        if (e.key in "1234567890.".split("")) {
            Inputs[ppty].value += e.key
        } else if (e.key == "Backspace") {
            var text = Inputs[ppty].value
            Inputs[ppty].value = text.slice(0, -1)
        }
    }
}

export function programInput(Inputs, borderColor="black") {
    canvas.onmousemove = (e) => {
        var box = MousePosHandling(e, Inputs)
        for (var ppty in Inputs) {
            if (Inputs[ppty].inputType === "Textbox" && Inputs[ppty].input === true) {
                if (ppty === box || Inputs[ppty].focus === true) {
                    Inputs[ppty].border = Inputs[ppty].outline
                } else {
                    Inputs[ppty].border = borderColor
                }
            } 
        }
    }
    canvas.onclick = (e) => {
        var box = MousePosHandling(e, Inputs)
        for (var ppty in Inputs) {
            if (ppty === box) {
                if (Inputs[ppty].inputType === "Textbox") {
                    if (Inputs[ppty].input === true) {
                        Inputs[ppty].focus = true
                        keyInput(Inputs, ppty)
                    } else {
                        Inputs[ppty].focus = false
                    }
                } else if (Inputs[ppty].inputType === "Button") {
                    Inputs[ppty].onclick()
                }
            } else if (Inputs[ppty].inputType === "Textbox" && ppty != box) {
                Inputs[ppty].focus = false
            }
        }
    }
}

export function colorRect(leftX, topY, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(leftX, topY, width, height);
}

export function colorCircle(leftX, topY, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath()
    ctx.arc(leftX, topY, radius, 0, 2*Math.PI, true) //x, y represents the centre
    ctx.fill()
}

export class Button {
    constructor(callback, x, y, width, vPadding, text="", fontSize=40, fontFamily="Arial", border="black" ) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.border = border;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.vPadding = vPadding;
        this.inputType = "Button"
        this.callback = callback;
        this.xEnd = x+width;
        this.yEnd = y+(this.vPadding)+((28/40)*this.fontSize);
        this.input = true;
    }

    draw() {
        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        ctx.strokeStyle = this.border;
        ctx.strokeRect(this.x, this.y, this.width, ((28/40)*this.fontSize)+(this.vPadding*2))
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x+20, this.y+(this.vPadding)+((28/40)*this.fontSize));
    }
    onclick() {
        this.callback()
    }
}