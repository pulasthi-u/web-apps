var carromBoard = document.getElementById('carromBoard');
var disc = document.getElementById('disc');

var noCollisions = 10;

var wallLength = carromBoard.clientHeight;
var discWidth = disc.clientHeight;

var startXPos = 250;
var startAngle = Math.PI/6;
var cumulativeWallIndex = 0;

var nowXCoord = startXPos;
var nowYCoord = 0;

var speed = 2;
var totalTime = 0;

var xCoords = [nowXCoord];
var yCoords = [nowYCoord];
var times = [0];

for (var i = 0; i < noCollisions; i++) {
    rWallThreshAngle = Math.atan(wallLength/(wallLength - startXPos));
    lWallThreshAngle = Math.PI - Math.atan(wallLength/startXPos);
    
    wallIndex = 0;
    
    if (startAngle < rWallThreshAngle) {
        cumulativeWallIndex++;
        wallIndex = cumulativeWallIndex % 4;
        startXPos = (wallLength - startXPos) * Math.tan(startAngle);
        startAngle = Math.PI/2 - startAngle;
    } else if (startAngle < lWallThreshAngle) {
        cumulativeWallIndex += 2;
        wallIndex = cumulativeWallIndex % 4;
        startXPos = wallLength - (startXPos + (wallLength / Math.tan(startAngle)));
        startAngle = Math.PI - startAngle;
    } else {
        cumulativeWallIndex += 3;
        wallIndex = cumulativeWallIndex % 4;
        startXPos = wallLength - (startXPos * Math.tan(Math.PI - startAngle));
        startAngle = 1.5*Math.PI - startAngle;
    }
    
    var nextXCoord = 0;
    var nextYCoord = 0;
    
    if (wallIndex == 0) {
        nextXCoord = startXPos;
        nextYCoord = 0;
    } else if (wallIndex == 1) {
        nextXCoord = wallLength;
        nextYCoord = startXPos;
    } else if (wallIndex == 2) {
        nextXCoord = wallLength - startXPos;
        nextYCoord = wallLength;
    } else {
        nextXCoord = 0;
        nextYCoord = wallLength - startXPos;
    }
    
    var distance = Math.sqrt(Math.pow(nowXCoord - nextXCoord, 2) + Math.pow(nowYCoord - nextYCoord, 2));
    var timeTaken = distance / speed;
    totalTime += timeTaken;

    times.push(timeTaken);
    xCoords.push(nextXCoord);
    yCoords.push(nextYCoord);
    
    nowXCoord = nextXCoord;
    nowYCoord = nextYCoord;
}

var line = "@keyframes animate {";
var cumulativeTime = 0;

for (var j = 0; j < noCollisions + 1; j++) {
    cumulativeTime += times[j]
    var progressPercent = (cumulativeTime/totalTime) * 100;
    var xCoord = xCoords[j] - 0.5*discWidth;
    var yCoord = wallLength - yCoords[j] - 0.5*discWidth;
    line += progressPercent + "% {transform: translateX(" + xCoord + "px) translateY(" + yCoord + "px)} ";
}

line += "}";

document.getElementsByTagName("style")[0].innerHTML = line;