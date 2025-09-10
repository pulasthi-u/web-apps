function everything() {
var space = document.getElementById('space');
var projectile = document.getElementById('projectile');

var initialVelocity = 0, initialVerticalVelocity = 0, horizontalVelocity = 0, angleInDegrees = 0, angleInRadians = 0, animateTime = 0, acceleration = 10;

var totalXDisplacement = 0, totalYDisplacement = 0, highestUpwardDisplacement = 0, highestDownwardDisplacement = 0, finalDisplacement = 0;

var timeWhenVerticalVelocityIsZero = 0;

var cosineOfAngle = 0, sineOfAngle = 0;

initialVelocity = parseInt(document.getElementById('velocity').value);
angleInDegrees = parseInt(document.getElementById('angle').value);
animateTime = parseInt(document.getElementById('time').value);

if (angleInDegrees == 90) {
    sineOfAngle = 1;
    cosineOfAngle = 0;
} else {
    angleInRadians = angleInDegrees * Math.PI / 180;
    sineOfAngle = Math.sin(angleInRadians);
    cosineOfAngle = Math.cos(angleInRadians);
}

initialVerticalVelocity = sineOfAngle * initialVelocity;
horizontalVelocity = cosineOfAngle * initialVelocity;

timeWhenVerticalVelocityIsZero = initialVerticalVelocity / acceleration;

highestUpwardDisplacement = (initialVerticalVelocity * timeWhenVerticalVelocityIsZero) - ((acceleration / 2) * timeWhenVerticalVelocityIsZero ** 2);

finalDisplacement = (initialVerticalVelocity * animateTime) - ((acceleration / 2) * animateTime ** 2);

var straightLinePath = document.createElement("HR");
var ground = document.createElement("HR");

straightLinePath.id = "straightLinePath";
ground.id = "ground";

straightLinePath.transform = "rotateZ(-" + angleInDegrees + "deg)";

space.appendChild(straightLinePath);
    
    
}