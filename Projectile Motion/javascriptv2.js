var ball = null, screen = null, pageStyles = null;

var screenWidth = 0, screenHeight = 0, heightOfBall = 0;

var angle = 0, velocity = 0, gravitationalAcceleration = 0, intercept = 0, animateTime = 0;
var sineOfAngle = 0, cosineOfAngle = 0;
var highestUpwardYDisplacement = 0, highestDownwardYDisplacement = 0, highestDownwardYDisplacementAsPartOfScreen = 0, highestUpwardYDisplacementAsPartOfScreen = 0, totalYDisplacement = 0, highestXDisplacement = 0;
var initialVerticalVelocityVector = 0, horizontalVelocityVector = 0, timeAtWhichAvgVelIsZero = 0;

var beginPosition = 0;

var keyframesCode = "@keyframes trajectory {";

var increment = 0.001;

var previousVerticalDisplacement = 0;

var horizontalLines = null, verticalLines = null;

function initialize() {
    obtainInformation();
    initiateVariables();
    formulateAnimation();
    applyAnimation();
}

function obtainInformation() {
    ball = document.getElementById('ball');
    screen = document.getElementById('screen');
    pageStyles = document.getElementsByTagName('style')[0];

    screenWidth = screen.clientWidth;
    screenHeight = screen.clientHeight;
    heightOfBall = ball.clientHeight;
    
    angle = (parseInt(document.getElementById('angle').value) * Math.PI) / 180; // Convert angle to radians
    velocity = parseInt(document.getElementById('velocity').value);
    gravitationalAcceleration = parseInt(document.getElementById('acceleration').value);
    animateTime = parseInt(document.getElementById('time').value);
    
    var interceptBox = document.getElementById('intercept').value;
    if (interceptBox != "") {
        intercept = parseInt(interceptBox);
    } else {
        intercept = 0;
    }
}

function initiateVariables() {
    horizontalLines = Array((animateTime / 0.5));
    verticalLines = Array((animateTime / 0.5));
    if (angle == (Math.PI / 2)) {
        cosineOfAngle = 0;
        sineOfAngle = 1;
    } else {
        cosineOfAngle = Math.cos(angle);
        sineOfAngle = Math.sin(angle);
    }
    initialVerticalVelocityVector = sineOfAngle * velocity;
    horizontalVelocityVector = cosineOfAngle * velocity;
    highestXDisplacement = (Math.cos(Math.PI / 4)) * velocity * animateTime; // Because 45deg is the highest range
    
    timeAtWhichAvgVelIsZero = ((2 * initialVerticalVelocityVector) + gravitationalAcceleration) / (2  * gravitationalAcceleration);
    console.log(timeAtWhichAvgVelIsZero);
    var upwardDisplacementThisSecond = 1;
    var upwardTime = 0;
    highestUpwardYDisplacement = 0;
    while ((upwardDisplacementThisSecond > 0) & (upwardTime <= animateTime)) {
        upwardDisplacementThisSecond = ((2 * initialVerticalVelocityVector) - (2 * gravitationalAcceleration * upwardTime) + (gravitationalAcceleration * increment)) / 2;
        highestUpwardYDisplacement += upwardDisplacementThisSecond;
        upwardTime += increment;
    }
    console.log(upwardTime);
    highestDownwardYDisplacement = 0;
    if (animateTime > timeAtWhichAvgVelIsZero) {
        var downwardTime = timeAtWhichAvgVelIsZero - increment;
        var downwardDisplacementThisSecond = 1;
        while (downwardTime < animateTime) {
            downwardDisplacementThisSecond = ((2 * initialVerticalVelocityVector) - (2 * gravitationalAcceleration * downwardTime) + (gravitationalAcceleration * increment)) / 2;
            highestDownwardYDisplacement += downwardDisplacementThisSecond;
            downwardTime += increment;
        }
        highestDownwardYDisplacement = Math.abs(highestDownwardYDisplacement + highestUpwardYDisplacement);
    }
    totalYDisplacement = highestDownwardYDisplacement + highestUpwardYDisplacement;
    highestDownwardYDisplacementAsPartOfScreen = (highestDownwardYDisplacement / totalYDisplacement) * screenHeight
    highestUpwardYDisplacementAsPartOfScreen = highestUpwardYDisplacement / totalYDisplacement * screenHeight;
    beginPosition = screenHeight - highestDownwardYDisplacementAsPartOfScreen;
}

function formulateAnimation() {
    var currentLineNumber = 0;
    for (var time = 0; time < (animateTime + increment); time+= increment) {
        if (time > animateTime) {
            time = animateTime;
        }
        var horizontalDisplacement = horizontalVelocityVector * time;
        var horizontalDisplacementAsPartOfScreen = (horizontalDisplacement / highestXDisplacement) * screenWidth;
        var currentVerticalDisplacement = ((2 * initialVerticalVelocityVector) - (2 * gravitationalAcceleration * time) + (gravitationalAcceleration * increment)) / 2;
        previousVerticalDisplacement += currentVerticalDisplacement;
        var totalVerticalDisplacementSoFar = previousVerticalDisplacement + currentVerticalDisplacement;
        var verticalDisplacementAsPartOfScreen = totalVerticalDisplacementSoFar / totalYDisplacement * screenHeight;
        var animationLine = ((time / animateTime) * 100) + "% {transform: translateX(" + horizontalDisplacementAsPartOfScreen + "px) translateY(" + (beginPosition - verticalDisplacementAsPartOfScreen) + "px);} ";
        keyframesCode = keyframesCode + animationLine;
    }
    keyframesCode = keyframesCode + "}";
    pageStyles.innerHTML = keyframesCode;
}

function applyAnimation() {
    markBeginning();
    ball.style.animationDuration = animateTime + "s";
    ball.style.animationDelay = "2s";
    ball.style.animationName = "trajectory";
}

function resetAnimation() {
    keyframesCode = "@keyframes trajectory {";
    pageStyles.innerHTML = "";
    screen.removeChild(document.getElementById('baseLine'));
    screen.removeChild(document.getElementById('straightLinePath'));
    ball.style.animationName = "";
    ball.style.animationDuration = "0s";
    ball.style.transform = "translateY(" + (screenHeight - heightOfBall) + "px)";
}

function markBeginning() {
    var line = document.createElement("HR");
    line.id = "baseLine";
    line.style.marginTop = (beginPosition + heightOfBall / 2) + "px";
    line.style.marginLeft = heightOfBall / 2 + "px";
    
    var angularLine = document.createElement("HR");
    angularLine.id = "straightLinePath";
    angularLine.style.width = ((velocity * timeAtWhichVerticalVelIsZero) / sineOfAngle) + "px";
    angularLine.style.transform = "rotateZ(-" + ((angle * 180) / Math.PI) + "deg)";
    angularLine.style.marginTop = -heightOfBall / 2 + "px";
    angularLine.style.marginLeft = heightOfBall / 2 + "px";
    
    ball.style.transform = "translateY(" + beginPosition + "px)";
    screen.appendChild(line);
    screen.appendChild(angularLine);
}

/*
horizontalVelocityVector = cosineOfAngle * velocity;
    highestXDisplacement = Math.cos(Math.PI / 4) * velocity * animateTime;
    initialVerticalVelocityVector = sineOfAngle * velocity;
    //var timeTakenToZeroAcceleration = ((2 * initialVerticalVelocityVector) - gravitationalAcceleration) / (2 * gravitationalAcceleration);
    var timeTakenToZeroAcceleration = ((2 * initialVerticalVelocityVector) + (gravitationalAcceleration * increment)) / (2 * gravitationalAcceleration);
    console.log("ZERO");
    console.log(timeTakenToZeroAcceleration);
    //highestUpwardYDisplacement = initialVerticalVelocityVector * ((timeTakenToZeroAcceleration + 1) / 2);
    highestUpwardYDisplacement = (timeTakenToZeroAcceleration / 2) * (((2 * initialVerticalVelocityVector) - (2 * gravitationalAcceleration * timeTakenToZeroAcceleration) + (gravitationalAcceleration * increment)) / 2);
    //highestDownwardYDisplacement = Math.abs((animateTime / 2) * ((2 * initialVerticalVelocityVector) - (gravitationalAcceleration * animateTime) + gravitationalAcceleration));
    highestDownwardYDisplacement = Math.abs((animateTime / 2) * ((initialVerticalVelocityVector + ((2 * initialVerticalVelocityVector) - (2 * gravitationalAcceleration * animateTime) + (gravitationalAcceleration * increment))) / 2));
    totalYDisplacement = highestDownwardYDisplacement + highestUpwardYDisplacement;
    highestDownwardYDisplacementAsPartOfScreen = (highestDownwardYDisplacement / totalYDisplacement) * screenHeight;
    beginPosition = screenHeight - highestDownwardYDisplacementAsPartOfScreen;
*/