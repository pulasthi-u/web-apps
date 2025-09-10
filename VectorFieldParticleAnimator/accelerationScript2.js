var container = document.getElementById("container");

var totalHeight = container.clientHeight, totalWidth = container.clientWidth;

var space = document.createElement("CANVAS");
var tempSpace = document.createElement("CANVAS");

space.width = totalWidth;
space.height = totalHeight;
tempSpace.width = totalWidth;
tempSpace.height = totalHeight;

var ctx = space.getContext("2d");
var tempCtx = tempSpace.getContext("2d");

container.appendChild(space);

// Change the default coordinate system to a usual system with (0,0) in the middle, and (+)ve y values being in the upward direction
tempCtx.translate(totalWidth/2, totalHeight/2); // Map (0,0) to the middle
tempCtx.transform(1, 0, 0, -1, 0, 0); // Transformation matrix to flip coordinates about the x axis =  [[1 0 0][0 -1 0][0 0 1]]

// Actual Program

var xVelocity = 0, yVelocity = 0;

var m = 5, g = 1000;
var particleRadius = 1;
var arrowHeadLength = 5;
var arrowAngle = Math.PI/6;

var initX = 60;
var initY = -30;

var prevX = initX, prevY = initY;
var currentX = initX, currentY = initY;

var l = Math.sqrt(Math.pow(initX, 2) + Math.pow(initY, 2));
var trace = true; // true = trace path; false = don't trace path

var time = 0.001; // The particle is made to move with a certain velocity for this long

function f(x, y, t) {
    var i = -((g*x)/Math.pow(l, 2))*(2*initY-3*y); // Function in x, y, t, for coefficient of unit vector 
    var j = -(g/Math.pow(l, 2))*(Math.pow(x, 2) + 2*initY*y - 2*Math.pow(y, 2)); // Function in x, y, t for coefficient of unit vector j
    return {
        i: i,
        j: j,
        slope: j/i,
        magnitude: Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2)),
    };
}

drawParticle(particleRadius, initX, initY, false); // Draw particle at initial position

var startTime = new Date().getTime()/1000; // Convert milliseconds to seconds

function animateParticle() {
    var t = new Date().getTime()/1000 - startTime;
    
    var output = f(currentX, currentY, t);
    
    var xVelocityChange = output.i * time;
    var yVelocityChange = output.j * time;
    
    var xOffset = xVelocity*time + (output.i*Math.pow(time, 2))/2;
    var yOffset = yVelocity*time + (output.j*Math.pow(time, 2))/2;

    xVelocity += xVelocityChange;
    yVelocity += yVelocityChange;
    
    var newX = (2*currentX) - (prevX) + (output.i*Math.pow(time, 2));
    var newY = (2*currentY) - (prevY) + (output.j*Math.pow(time, 2));

    //var newX = prevX + xOffset;
    //var newY = prevY + yOffset;

    drawParticle(particleRadius, newX, newY, trace);
    drawVector(prevX, prevY, xVelocity, yVelocity);

    prevX = currentX;
    prevY = currentY;

    // Update initX and initY, so that the function is evaluated at the new values in the next iteration

    currentX = newX;
    currentY = newY;
    
    window.requestAnimationFrame(animateParticle);
}

function drawVector(initX, initY, vectorI, vectorJ) {
    var toX = initX + vectorI;
    var toY = initY + vectorJ;
    
    var dx = toX - initX;
    var dy = toY - initY;
    
    var initAngle = Math.atan(dx / dy);
    
    ctx.save();
    ctx.translate(totalWidth/2, totalHeight/2);
    ctx.transform(1, 0, 0, -1, 0, 0);
    ctx.beginPath();
    
    // Straight line
    ctx.moveTo(initX, initY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    
    // Arrow head
    ctx.moveTo(toX, toY);
    
    if (dy >= 0) {
        ctx.lineTo(toX - arrowHeadLength * Math.sin(initAngle - arrowAngle), toY - arrowHeadLength * Math.cos(initAngle - arrowAngle));
        ctx.lineTo(toX - arrowHeadLength * Math.sin(initAngle + arrowAngle), toY - arrowHeadLength * Math.cos(initAngle + arrowAngle));
    } else {
        ctx.lineTo(toX + arrowHeadLength * Math.sin(initAngle - arrowAngle), toY + arrowHeadLength * Math.cos(initAngle - arrowAngle));
        ctx.lineTo(toX + arrowHeadLength * Math.sin(initAngle + arrowAngle), toY + arrowHeadLength * Math.cos(initAngle + arrowAngle));
    }
    
    ctx.fill();
    
    ctx.restore();
}

function drawParticle(particleRadius, x, y, drawTrace) {
    ctx.clearRect(0, 0, totalWidth, totalHeight);
    
    if (!drawTrace) {
        tempCtx.clearRect(-totalWidth/2, -totalHeight/2, totalWidth, totalHeight);
    }
    
    tempCtx.beginPath();
    tempCtx.arc(x, y, particleRadius, 0, 2 * Math.PI);
    tempCtx.fill();
    
    ctx.drawImage(tempSpace, 0, 0);
}

window.requestAnimationFrame(animateParticle);