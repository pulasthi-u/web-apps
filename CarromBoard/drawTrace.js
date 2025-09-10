var board = document.getElementById('carromBoard');

var ctx = board.getContext("2d");

var cumulativeWallIndex = 0;

var wallLength = board.clientHeight;
var discWidth = 3;

function findNextWall(currentAngle, startPos, cumulativeWallIndex) {
    var rWallThreshAngle = Math.atan(wallLength/(wallLength - startPos));
    var lWallThreshAngle = Math.PI - Math.atan(wallLength/startPos);

    var wallIndex = 0;

    if (currentAngle < rWallThreshAngle) {
        cumulativeWallIndex++;
        wallIndex = cumulativeWallIndex % 4;
        startPos = (wallLength - startPos) * Math.tan(currentAngle);
        currentAngle = Math.PI/2 - currentAngle;
    } else if (currentAngle < lWallThreshAngle) {
        cumulativeWallIndex += 2;
        wallIndex = cumulativeWallIndex % 4;
        startPos = wallLength - (startPos + (wallLength / Math.tan(currentAngle)));
        currentAngle = Math.PI - currentAngle;
    } else {
        cumulativeWallIndex += 3;
        wallIndex = cumulativeWallIndex % 4;
        startPos = wallLength - (startPos * Math.tan(Math.PI - currentAngle));
        currentAngle = 1.5*Math.PI - currentAngle;
    }
    
    var nextXCoord;
    var nextYCoord;
    
    if (wallIndex == 0) {
        nextXCoord = startPos;
        nextYCoord = 0;
    } else if (wallIndex == 1) {
        nextXCoord = wallLength;
        nextYCoord = startPos;
    } else if (wallIndex == 2) {
        nextXCoord = wallLength - startPos;
        nextYCoord = wallLength;
    } else {
        nextXCoord = 0;
        nextYCoord = wallLength - startPos;
    }
    
    return [nextXCoord, nextYCoord, currentAngle, startPos, cumulativeWallIndex];
}

var minOverShoot = 0.3;

var xCoordNow = 100;
var yCoordNow = 0;
var currentAngle = (Math.PI/2)*0.8;
var startPos = xCoordNow;
var speed = 100;
var animationInterval = 0.01;
var firstCollisionWall = findNextWall(currentAngle, startPos, cumulativeWallIndex);
var xIncrement = findIncrements(xCoordNow, yCoordNow, firstCollisionWall[0], firstCollisionWall[1], speed, animationInterval)[0];
var yIncrement = findIncrements(xCoordNow, yCoordNow, firstCollisionWall[0], firstCollisionWall[1], speed, animationInterval)[1];

function findIncrements(fromX, fromY, toX, toY, speed, interval) {
    var distance = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
    var totalTime = distance/speed;
    var xSpeed = (toX - fromX)/totalTime;
    var ySpeed = (toY - fromY)/totalTime;
    var numIterations = (toX - fromX)/(xSpeed * interval);
    // var fractionalPart = numIterations - Math.floor(numIterations);
    // if (xSpeed < ySpeed) {
    //    minOverShoot = fractionalPart * interval * xSpeed;
    // } else {
    //    minOverShoot = fractionalPart * interval * ySpeed;
    // }
    // console.log(numIterations);
    return [xSpeed * interval, ySpeed * interval];
}

function findNextCoords() { // find what coords to move disc to
    var data = findNextWall(currentAngle, startPos, cumulativeWallIndex);
    var nextCollisionX = data[0];
    var nextCollisionY = data[1];
    var xDev = Math.abs(nextCollisionX - xCoordNow);
    var yDev = Math.abs(nextCollisionY - yCoordNow);
    console.log(xIncrement);
    if ((xDev < minOverShoot) || (yDev < minOverShoot)) {
        // console.log("COLLISION");
        // we have collided
        currentAngle = data[2];
        startPos = data[3];
        cumulativeWallIndex = data[4];
        xCoordNow = nextCollisionX;
        yCoordNow = nextCollisionY;
        var nextNextCollision = findNextWall(currentAngle, startPos, cumulativeWallIndex);
        var nextNextCollisionX = nextNextCollision[0];
        var nextNextCollisionY = nextNextCollision[1];
        xIncrement = findIncrements(xCoordNow, yCoordNow, nextNextCollisionX, nextNextCollisionY, speed, animationInterval)[0];
        yIncrement = findIncrements(xCoordNow, yCoordNow, nextNextCollisionX, nextNextCollisionY, speed, animationInterval)[1];
    } else {
        xCoordNow += xIncrement;
        yCoordNow += yIncrement;
    }
    return [xCoordNow, yCoordNow];
}

function draw() {
    ctx.beginPath();
    ctx.arc(xCoordNow, wallLength - yCoordNow, discWidth/2, 0, 2 * Math.PI);
    ctx.fill();
    var a = findNextCoords();
    // console.log(a[0], a[1]);
    window.requestAnimationFrame(draw);
}