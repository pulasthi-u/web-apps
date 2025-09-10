var space = document.getElementById("space");

var particle = document.getElementById("particle");

var particleLength = particle.clientHeight;

var sideLength = space.clientWidth;

var initX = 60, initY = -30;
var X = initX, Y = initY;

var xVel = 0, yVel = 0;
var g = 1000;
var l = Math.sqrt(Math.pow(initX, 2) + Math.pow(initY, 2));

var marginX = sideLength/2 + initX, marginY = sideLength/2 - initY;

particle.style.transform = "translateX(" + (marginX-(particleLength/2)) + "px) translateY(" + (marginY-(particleLength/2)) + "px)";

var time = 0.01;
var totalTime = 200;

function f(x, y, t) {
    var i = -((g*x)/Math.pow(l, 2))*(2*Y-3*y);
    var j = -(g/Math.pow(l, 2))*(Math.pow(x, 2) + 2*Y*y - 2*Math.pow(y, 2));
    return {
        i: i,
        j: j,
        magnitude: Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2)),
        slope: j/i,
    };
}

var t = 0.001;

function calculateNewPos(marginX, marginY, time) {
    var xNow = marginX - sideLength/2;
    var yNow = sideLength/2 - marginY;

    var xVelChange = f(xNow, yNow, time).i * t;
    var yVelChange = f(xNow, yNow, time).j * t;

    var xOff = xVel*t + (f(xNow, yNow, time).i*Math.pow(t, 2))/2;
    var yOff = yVel*t + (f(xNow, yNow, time).j*Math.pow(t, 2))/2;

    xVel += xVelChange;
    yVel += yVelChange;

    var newX = marginX + xOff;
    var newY = marginY - yOff;

    return {
        x: newX,
        y: newY,
    };
}

var animation = "@keyframes move {";

for (var instant = 0; instant < totalTime; instant += time) {
    var newPos = calculateNewPos(marginX, marginY, instant);
    var string = "translateX(" + (newPos.x-(particleLength/2)) + "px) translateY(" + (newPos.y-(particleLength/2)) +"px)";
    marginX = newPos.x;
    marginY = newPos.y;
    animation = animation + ((instant / totalTime) * 100) + "% { transform: " + string + ";}";
    //console.log(string);
}

animation = animation + "}";

document.getElementsByTagName("STYLE")[0].innerHTML = animation;
particle.style.animationName = "move";
particle.style.animationDuration = totalTime + "s";