var container = document.getElementById("container");

var totalHeight = container.clientHeight, totalWidth = container.clientWidth;

var space = document.createElement("CANVAS");

space.width = totalWidth;
space.height = totalHeight;

var ctx = space.getContext("2d");

container.appendChild(space);

// Change the default coordinate system to a usual system with (0,0) in the middle, and (+)ve y values being in the upward direction
ctx.translate(totalWidth/2, totalHeight/2); // Map (0,0) to the middle
ctx.transform(1, 0, 0, -1, 0, 0); // Transformation matrix to flip coordinates about the x axis =  [[1 0 0][0 -1 0][0 0 1]]

function f(x, y, t) {
    var i = x-y; // Function in x, y, t, for coefficient of unit vector i
    var j = x+y; // Function in x, y, t for coefficient of unit vector j
    return {
        i: i,
        j: j,
        slope: j/i,
        magnitude: Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2)),
    };
}

var time = 0.001; // The particle is made to move with a certain velocity for this long

var particleRadius = 1;

var initX = -20;
var initY = 100;
var trace = true; // true = trace path; false = don't trace path

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
    
    // Update initX and initY, so that the function is evaluated at the new values in the next iteration
    initX = newX;
    initY = newY;
    
    window.requestAnimationFrame(animateParticle);
}

function drawParticle(particleRadius, x, y, drawTrace) {
    if (!drawTrace) {
        ctx.clearRect(-totalWidth/2, -totalHeight/2, totalWidth, totalHeight);
    }
    
    ctx.beginPath();
    ctx.arc(initX, initY, particleRadius, 0, 2 * Math.PI);
    ctx.fill();
}

window.requestAnimationFrame(animateParticle);