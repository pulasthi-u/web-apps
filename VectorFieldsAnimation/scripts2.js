var plane = document.getElementById("space");

var rows = 21, cols = 21;

plane.style.gridTemplateColumns = "repeat (" + cols + ", 1fr)";
plane.style.gridTemplateRows = "repeat (" + rows + ", 1fr)";
var sideLength = plane.clientHeight / rows;

function f(x, y, t) {
    var i = x+y/t;
    var j = Math.sin(x*t);
    return {
        i: i,
        j: j,
        slope: j/i,
    };
}

var rowInit = (rows - 1)/2, colsInit = (cols - 1)/2;

function addCages() {
    for (var y = rowInit; y >= -rowInit; y--) {
        for (var x = -colsInit; x <= colsInit; x++) {
            var cage = document.createElement("CANVAS");
            cage.width = sideLength;
            cage.height = sideLength;
            cage.id = "C/" + x + "/" + y;
            plane.appendChild(cage);
        }
    }
}

var startTime = new Date().getTime()/1000;

function animate() {
    var nowTime = new Date().getTime()/1000;
    var t = nowTime - startTime;
    for (var y = rowInit; y >= -rowInit; y--) {
        for (var x = -colsInit; x <= colsInit; x++) {
            var cageBeingAnimated = document.getElementById("C/" + x + "/" + y);
            var ctx = cageBeingAnimated.getContext("2d");
            var output = f(x, y, t);
            
            ctx.clearRect(0, 0, sideLength, sideLength);
            ctx.beginPath();
            
            var slope = output.slope;
            
            var xOffset = sideLength / (2 * Math.sqrt(Math.pow(slope, 2)) + 1);
            if (slope == Infinity) {
                var yOffset = sideLength / 2;
            } else if (slope == -Infinity) {
                var yOffset = -sideLength / 2;
            } else {
                var yOffset = slope * xOffset;
            }
            
            ctx.moveTo(sideLength/2, sideLength/2);
            
            var toX, toY;
            if (output.i > 0) {
                toX = sideLength/2 + xOffset;
                toY = sideLength/2 - yOffset;
            } else {
                toX = sideLength/2 - xOffset;
                toY = sideLength/2 + yOffset;
            }
            
            ctx.lineTo(toX, toY);
            
            ctx.stroke();
        }
    }
    window.requestAnimationFrame(animate);
}

addCages();
animate();