var coordinatePlane = document.getElementById("graph");

var rows = 31, cols = 31; // Make this an odd number

coordinatePlane.style.gridTemplateRows = "repeat(" + rows + ", 1fr)";
coordinatePlane.style.gridTemplateColumns = "repeat(" + cols + ", 1fr)"; // Setup the div to arrange elements in a grid of dimensions rows * cols

var sideLength = coordinatePlane.clientHeight / rows;

function f(x, y) {
var a = 10;

var r = Math.pow(x, 2) + Math.pow(y, 2);

    var i = a + (-500 * x)/Math.pow((Math.pow(x, 2) + Math.pow(y, 2)), 3/2);

//1*(x-a/2)/Math.pow((Math.pow(x-a/2, 2) + Math.pow(y, 2)), 3/2) - 5*(x+a/2)/Math.pow((Math.pow(x+a/2, 2) + Math.pow(y, 2)), 3/2); // Coefficient of unit vector i

    var j = (-500 * y)/Math.pow((Math.pow(x, 2) + Math.pow(y, 2)), 3/2);

//1*(y)/Math.pow((Math.pow(x-a/2, 2) + Math.pow(y, 2)), 3/2) - 5*(y)/Math.pow((Math.pow(x+a/2, 2) + Math.pow(y, 2)), 3/2); // Coefficient of unit vector j
    return {
        magnitude: Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2)), // Magnitude of vector
        slope: j/i, // Slope of vector
        i: i,
        j: j,
    };
}

function findMaxMagnitude() {
    var magnitudes = [];
    var xInit = -(cols - 1)/2, yInit = (rows - 1)/2;
    for (var y = yInit; y >= -yInit; y--) {
        for (var x = xInit; x <= -xInit; x++) {
            magnitudes.push(f(x, y).magnitude);
        }
    }
    return Math.max.apply(null, magnitudes);
}

var maxMagnitude = findMaxMagnitude();

function addCages() {
    var xInit = -(cols - 1)/2, yInit = (rows - 1)/2; // We go from the leftmost top cage numbered [-(rows - 1)/2, (cols - 1)/2], to the rightmost bottom cage numbered [(rows - 1)/2, -(cols - 1)/2]
    
    for (var y = yInit; y >= -yInit; y--) {
        for (var x = xInit; x <= -xInit; x++) {
            
            var output = f(x, y);
            var slope = output.slope;
            var mag = output.magnitude;
            
            var scaleFactor = 1; //mag / maxMagnitude;
            
            var xOffset = scaleFactor * (sideLength / (2 * Math.sqrt(1 + Math.pow(slope, 2)))); // Magnitude of the x coordinate of the intersection point of a circle with center (sideLength/2, sideLength/2), and radius = sideLength, and straight line with gradient = slope, through point (sideLength/2, sideLength/2), scaled by some factor
            
            var yOffset;
            
            if (slope == Infinity) {
                yOffset = scaleFactor * sideLength / 2;
            } else if (slope == -Infinity) {
                yOffset = scaleFactor * -sideLength / 2;
            } else {
                yOffset = slope * xOffset; // Straight line function evaluated at xOffset, to get the y coordinate of the intersection point
            }
            
            var cage = document.createElement("CANVAS"); // Each cage is a mini-coordinate plane with (0,0) at the topmost left, and (sideLength, sideLength) at the rightmost bottom
            cage.height = sideLength;
            cage.width = sideLength;
            var ctx = cage.getContext("2d");
            
            drawVector(ctx, xOffset, yOffset, output.i, mag);
            
            coordinatePlane.appendChild(cage);
        }
    }
}

function drawVector(ctx, xOffset, yOffset, i, magnitude) {
    var fromX = sideLength/2, fromY = sideLength/2, toX, toY;
    if (i >= 0) { // Necessary to properly determine the beginPoint and endPoint
        toX = (sideLength/2) + xOffset;
	fromX = (sideLength/2) - xOffset*0.5;
        toY = (sideLength/2) - yOffset;
	fromY = (sideLength/2) + yOffset*0.5;
    } else {
        toX = (sideLength/2) - xOffset;
	fromX = (sideLength/2) + xOffset*0.5;
        toY = (sideLength/2) + yOffset;
	fromY = (sideLength/2) - yOffset*0.5;
    }
    
    var dx = toX - fromX; // Difference in x coordinates
    var dy = toY - fromY; // Difference in y coordinates
    
    var initAngle = Math.atan(dx/dy);
    
    var arrowHeadLength = 5; // Arrowhead will be an isosceles triangle. This is the length of the two equal sides
    var arrowAngle = Math.PI/12; // Half the angle between the equal sides of the above isosceles triangle
    
    /*
    var color = Math.round(16777215 * (magnitude / maxMagnitude));
    ctx.strokeStyle = "#" + color.toString(16);
    ctx.fillStyle = "#" + color.toString(16);
    */
    
    ctx.beginPath();
    
    // Draw the straight line part of the vector
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    
    // Draw the arrow head
    ctx.moveTo(toX, toY);
    
    // Negative angles and positive angles have to be treated separately
    if (dy < 0) {
        ctx.lineTo(toX + (arrowHeadLength * Math.sin(initAngle - arrowAngle)), toY + (arrowHeadLength * Math.cos(initAngle - arrowAngle)));
        ctx.lineTo(toX + (arrowHeadLength * Math.sin(initAngle + arrowAngle)), toY + (arrowHeadLength * Math.cos(initAngle + arrowAngle)));
    } else if (dy >= 0) {
        ctx.lineTo(toX - (arrowHeadLength * Math.sin(initAngle - arrowAngle)), toY - (arrowHeadLength * Math.cos(initAngle - arrowAngle)));
        ctx.lineTo(toX - (arrowHeadLength * Math.sin(initAngle + arrowAngle)), toY - (arrowHeadLength * Math.cos(initAngle + arrowAngle)));
    }
    
    ctx.fill();
}

function drawAxes() {
    var colsFirstIndex = (cols - 1)/2;
    var rowsFirstIndex = (cols * (rows - 1)/2);
    var totalChildren = rows * cols;
    var loopTime = 1;
    for (var childIndex = colsFirstIndex; childIndex < totalChildren; childIndex += cols) {
        var child = coordinatePlane.children[childIndex];
        var ctx = child.getContext("2d");
        ctx.moveTo(sideLength/2, 0);
        ctx.lineTo(sideLength/2, sideLength);
        ctx.font = "12px Segoe UI";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(- childIndex + loopTime * cols - loopTime, sideLength/2-2, sideLength/2);
        ctx.stroke();
        loopTime++;
    }
    for (var childIndex = rowsFirstIndex; childIndex - rowsFirstIndex < rows; childIndex++) {
        var child = coordinatePlane.children[childIndex];
        var ctx = child.getContext("2d");
        ctx.moveTo(0, sideLength/2);
        ctx.lineTo(sideLength, sideLength/2);
        ctx.stroke();
        if (childIndex != colsFirstIndex+rowsFirstIndex) {
            ctx.font = "12px Segoe UI";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText(-colsFirstIndex + childIndex - rowsFirstIndex, sideLength/2, sideLength/2);
        }
    }
    
}

addCages();
//drawAxes();