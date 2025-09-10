var u = 0;
var g = 0;
var angle = 0;
var sine = 0;
var cosine = 0;
var maximumHeight = 0;
var maximumRange = 0;
var flightTime = 0;

function setVariables() {
    u = parseFloat(document.getElementById('initialVel').value);
    angle = parseFloat(document.getElementById('angle').value);
    g = parseFloat(document.getElementById('gravity').value);
    sine = Math.sin((angle * Math.PI/180));
    cosine = Math.cos((angle * Math.PI/180));
    flightTime = (2* u * sine)/g;
    maximumHeight = ((u * sine) ** 2) / (2 * g);
    maximumRange = flightTime * u * cosine;
}

function animateProjectiles() {
    var projectile = document.createElement("DIV");
}