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

var particleRadius = 1;
var arrowHeadLength = 5;
var arrowAngle = Math.PI/6;

var initX = 100;
var initY = 100;
var trace = false; // true = trace path; false = don't trace path

var time = 0.001; // The particle is made to move with a certain velocity for this long

function f(x, y, t) {
    var i = -2*x; // Function in x, y, t, for coefficient of unit vector i
    var j = 0; // Function in x, y, t for coefficient of unit vector j
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
    
    var output = f(initX, initY, t);
    
    var xOffset = output.i * time;
    var yOffset = output.j * time;
    
    var newX = initX + xOffset;
    var newY = initY + yOffset;
    
    drawParticle(particleRadius, newX, newY, trace);
    drawVector(initX, initY, output.i, output.j);
    
    // Update initX and initY, so that the function is evaluated at the new values in the next iteration
    initX = newX;
    initY = newY;
    
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
    tempCtx.arc(initX, initY, particleRadius, 0, 2 * Math.PI);
    tempCtx.fill();
    
    ctx.drawImage(tempSpace, 0, 0);
}

window.requestAnimationFrame(animateParticle);