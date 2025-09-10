var ball = null, screen = null, pageStyles = null;

var screenWidth = 0, screenHeight = 0, heightOfBall = 0;

var rawAngle = 0, velocity = 0, gravitationalAcceleration = 0, intercept = 0, animateTime = 0;
var sineOfAngle = 0, cosineOfAngle = 0;
var highestUpwardYDisplacement = 0, highestDownwardYDisplacement = 0, highestDownwardYDisplacementAsPartOfScreen = 0, highestUpwardYDisplacementAsPartOfScreen = 0, totalYDisplacement = 0, highestXDisplacement = 0;
var initialVerticalVelocityVector = 0, horizontalVelocityVector = 0, timeAtWhichVerticalVelIsZero = 0;

var beginPosition = 0;

var keyframesCode = "@keyframes trajectory {";

var increment = 0.1;

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
    
    rawAngle = parseInt(document.getElementById('angle').value); 
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
    var angle = rawAngle * Math.PI / 180; // Convert angle to radians
    if (angle == Math.PI / 2) {
        cosineOfAngle = 0;
        sineOfAngle = 1;
    } else {
        cosineOfAngle = Math.cos(angle);
        sineOfAngle = Math.sin(angle);
    }
    
    initialVerticalVelocityVector = sineOfAngle * velocity;
    horizontalVelocityVector = cosineOfAngle * velocity;
    
    highestXDisplacement = Math.cos(Math.PI / 4) * velocity * animateTime; // At angle = 45deg; because that covers the highest range
    
    timeAtWhichVerticalVelIsZero = initialVerticalVelocityVector / gravitationalAcceleration;
    var verticalHeightAtZero = initialVerticalVelocityVector * timeAtWhichVerticalVelIsZero;
    
    // If no gravity were present, the projectile would move along a straight line inclined at the specified angle. This velocity would be constant; so if the t = time where velocity becomes zero; it would have moved velocity * t. The vertical height at which it would be, at that moment, would be that vector * sine of the angle. When gravity is there, it would fall 1/2*g*t^2, from that vertical height.
    
    highestUpwardYDisplacement = verticalHeightAtZero - ((gravitationalAcceleration / 2) * timeAtWhichVerticalVelIsZero ** 2);
    
    highestDownwardYDisplacement = (initialVerticalVelocityVector * animateTime) - ((gravitationalAcceleration / 2) * animateTime ** 2);
    
    if (highestDownwardYDisplacement > 0) {
        highestDownwardYDisplacement = 0;
    } else {
        highestDownwardYDisplacement = Math.abs(highestDownwardYDisplacement);
    }
    
    totalYDisplacement = highestDownwardYDisplacement + highestUpwardYDisplacement;
    
    highestDownwardYDisplacementAsPartOfScreen = (highestDownwardYDisplacement / totalYDisplacement) * screenHeight;
    highestUpwardYDisplacementAsPartOfScreen = highestUpwardYDisplacement / totalYDisplacement * screenHeight;
    
    beginPosition = screenHeight - highestDownwardYDisplacementAsPartOfScreen - (heightOfBall / 2);
}

function formulateAnimation() {
    var currentLineNumber = 0;
    for (var time = 0; time < (animateTime + increment); time += increment) {
        if (time > animateTime) {
            time = animateTime;
        }
        var horizontalDisplacement = horizontalVelocityVector * time;
        var horizontalDisplacementAsPartOfScreen = ((horizontalDisplacement / highestXDisplacement) * screenWidth); // + (heightOfBall / 8);
        
        var verticalDisplacement = (initialVerticalVelocityVector * time) - ((gravitationalAcceleration / 2) * time ** 2);
        var verticalDisplacementAsPartOfScreen = (verticalDisplacement / totalYDisplacement * screenHeight); // - (heightOfBall / 2);
        
        console.log(verticalDisplacement);
        
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
    screen.removeChild(document.getElementById('baseLine'));
    screen.removeChild(document.getElementById('straightLinePath'));
    ball.style.animationName = "";
    ball.style.animationDuration = "0s";
    ball.style.transform = "translateY(" + (screenHeight - heightOfBall) + "px)";
    keyframesCode = "@keyframes trajectory {";
}

function markBeginning() {
    var line = document.createElement("HR");
    line.id = "baseLine";
    line.style.marginTop = (beginPosition + heightOfBall / 2) + "px";
    line.style.marginLeft = heightOfBall / 2 + "px";
    
    var angularLine = document.createElement("HR");
    var angularLineWidth = highestUpwardYDisplacementAsPartOfScreen / Math.cos((90 - rawAngle) * Math.PI / 180);
    angularLine.id = "straightLinePath";
    angularLine.style.width = angularLineWidth + "px";
    angularLine.style.marginTop = -heightOfBall / 2 + "px";
    angularLine.style.marginLeft = heightOfBall / 2 + "px";
    angularLine.style.transform = "rotateZ(-" + rawAngle + "deg)";
    
    ball.style.transform = "translateY(" + beginPosition + "px)";
    screen.appendChild(line);
    screen.appendChild(angularLine);
}