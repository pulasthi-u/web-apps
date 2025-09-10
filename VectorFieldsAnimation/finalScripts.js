var space = document.getElementById("space");

var rows = 31, cols = 31; // Make this an odd number

space.style.gridTemplateColumns = "repeat(" + cols + ", 1fr)";
space.style.gridTemplateRows = "repeat(" + rows + ", 1fr)";

var sideLength = space.clientWidth / rows;

var g = 10;

function f(x, y, t) {
var a = 5;
var k = 5;
    var i = k*(x-a*Math.cos(t/2))/Math.pow((Math.pow(x-a*Math.cos(t/2), 2) + Math.pow(y-a*Math.sin(t/2), 2)), 3/2) - k*(x+a/2)/Math.pow((Math.pow(x+a/2, 2) + Math.pow(y, 2)), 3/2); // Function in x, y, t giving coefficient of unit vector i
    var j = k*(y-a*Math.sin(t/2))/Math.pow((Math.pow(x-a*Math.cos(t/2), 2) + Math.pow(y-a*Math.sin(t/2), 2)), 3/2) - k*(y)/Math.pow((Math.pow(x+a/2, 2) + Math.pow(y, 2)), 3/2); // Function in x, y, t giving coefficient of unit vector j
    return {
        i: i,
        j: j,
        slope: j/i,
        magnitude: Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2)),
    };
}

var rowsInit = (rows - 1)/2, colsInit = (cols - 1)/2;

function createCages() {
    for (var y = rowsInit; y >= -rowsInit; y--) {
        for (var x = -colsInit; x <= colsInit; x++) {
            var cage = document.createElement("CANVAS");
            cage.width = sideLength;
            cage.height = sideLength;
            cage.id = "C/" + x + "/" + y; // Give each cage a unique ID based on its x, y coordinates
            space.appendChild(cage);
        }
    }
}

var startTime = new Date().getTime()/1000;

function animate() {
    var currentTime = new Date().getTime()/1000;
    var t = currentTime - startTime; // Get time elapsed
    for (var y = rowsInit; y >= -rowsInit; y--) {
        for (var x = -colsInit; x <= colsInit; x++) {
            var cageToAnimate = document.getElementById("C/" + x + "/" + y);
            var output = f(x, y, t); // Evaluate the function at current values
            drawVector(cageToAnimate, output);
        }
    }
    window.requestAnimationFrame(animate);
}

function drawVector(cageToAnimate, output) {
    var ctx = cageToAnimate.getContext("2d");
    var slope = output.slope;
    var vectorI = output.i;
    
    var xOffset = sideLength / (2 * Math.sqrt(Math.pow(slope, 2) + 1));
    
    var yOffset;
    
    if (slope == Infinity) {
        yOffset = sideLength/2;
    } else if (slope == -Infinity) {
        yOffset = -sideLength/2;
    } else {
        yOffset = slope * xOffset;
    }
    
    ctx.clearRect(0, 0, sideLength, sideLength); // Clear cage
    
    ctx.beginPath();
    
    // Draw straight line part
    var fromX = sideLength/2, fromY = sideLength/2, toX, toY;
    if (vectorI >= 0) { // Necessary for the arrowhead is drawn correctly
        toX = sideLength/2 + xOffset;
        toY = sideLength/2 - yOffset;
    } else {
        toX = sideLength/2 - xOffset;
        toY = sideLength/2 + yOffset;
    }
    
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    
    // Draw arrowhead
    var arrowHeadLength = 6;
    var arrowAngle = Math.PI/6;
    
    var dx = toX - fromX;
    var dy = toY - fromY;
    
    var initAngle = Math.atan(dx/dy);
    
    ctx.moveTo(toX, toY);
    
    if (dy < 0) {
        ctx.lineTo(toX + (arrowHeadLength * Math.sin(initAngle - arrowAngle)), toY + (arrowHeadLength * Math.cos(initAngle - arrowAngle)));
        ctx.lineTo(toX + (arrowHeadLength * Math.sin(initAngle + arrowAngle)), toY + (arrowHeadLength * Math.cos(initAngle + arrowAngle)));
    } else if (dy >= 0) {
        ctx.lineTo(toX - (arrowHeadLength * Math.sin(initAngle - arrowAngle)), toY - (arrowHeadLength * Math.cos(initAngle - arrowAngle)));
        ctx.lineTo(toX - (arrowHeadLength * Math.sin(initAngle + arrowAngle)), toY - (arrowHeadLength * Math.cos(initAngle + arrowAngle)));
    }
    
    ctx.fill();
}

createCages();
window.requestAnimationFrame(animate);