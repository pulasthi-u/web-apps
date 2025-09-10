var space = document.getElementById("space");

var particle = document.getElementById("particle");

var particleLength = particle.clientHeight;

var sideLength = space.clientWidth;

var xInit = 200, yInit = 150;

var marginX = sideLength/2 + xInit, marginY = sideLength/2 - yInit;

particle.style.transform = "translateX(" + (marginX-(particleLength/2)) + "px) translateY(" + (marginY-(particleLength/2)) + "px)";

var time = 0.0001;
var totalTime = 10;

function f(x, y, t) {
    var i = y*x;
    var j = x/y;
    return {
        i: i/100020,
        j: j/100020,
        magnitude: Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2)),
        slope: j/i,
    };
}

function calculateNewPos(marginX, marginY, time) {
    var xNow = marginX - sideLength/2;
    var yNow = sideLength/2 - marginY;
    var xVel = f(xNow, yNow, time).i;
    var yVel = f(xNow, yNow, time).j;
    var newX = marginX + (xVel * time);
    var newY = marginY - (yVel * time);
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