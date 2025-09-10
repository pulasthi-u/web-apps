var graph = document.getElementById('graph');

var rows = 30;

var sideLength = graph.clientHeight / rows;

var cols = Math.round(graph.clientWidth / sideLength);

graph.style.gridTemplateRows = "repeat(" + rows + ", 1fr)";
graph.style.gridTemplateColumns = "repeat(" + cols + ", 1fr)";

var theta, time;

var sidesOfPolygon = 4, r = 1, alpha = ((2*Math.PI)/sidesOfPolygon)/2, m = 5, F = 50, g=10, I=5;

var scaleOffset = 4/7;

/*
for (theta = rows; theta >= 1; theta--) {
    for (time = 1; time <= cols; time++) {
        var canvas = document.createElement("CANVAS");
        canvas.height = sideLength;
        canvas.width = sideLength;
        var angle = (Math.PI/(2*rows)) * theta;
        var slope = Math.sqrt((2*m*g*r*(Math.cos(alpha)-Math.cos(alpha-angle))/I+2*F*r*(Math.sin(alpha)-Math.sin(alpha-angle))/I));
        var drawer = canvas.getContext("2d");
        var xOffset = (sideLength/(2*Math.sqrt(1+slope**2)))*scaleOffset;
        var yOffset = slope * xOffset;
        drawArrow(drawer, xOffset, yOffset);
        graph.appendChild(canvas);
    }
}*/

var L=5, alpha=3*(Math.PI/4), g = 10;

for (theta = rows; theta >= 1; theta--) {
    for (time = 1; time <= cols; time++) {
        var canvas = document.createElement("CANVAS");
        canvas.height = sideLength;
        canvas.width = sideLength;
        if ((theta == rows) || (theta == 1)) {
            var angle = alpha;
            var slope = -(Math.sqrt(2*g*L*(Math.cos(angle)-Math.cos(alpha))))/r;
        } else if (theta >= (rows/2)) {
            //var angle = (Math.PI/(6*rows)) * (theta);
            var angle = (alpha / (rows/2)) * (theta % (rows/2));
            var slope = -(Math.sqrt(2*g*L*(Math.cos(angle)-Math.cos(alpha))))/r;
        } else {
            //var angle = -(Math.PI/(6*rows)) * (theta - rows/2);
            var angle = (alpha / (rows/2)) * ((rows/2) - (theta % (rows/2)));
            var slope = -(Math.sqrt(2*g*L*(Math.cos(angle)-Math.cos(alpha))))/r;
        }
        //var angle = (Math.PI/(6*rows)) * (theta);
        var drawer = canvas.getContext("2d");
        var xOffset = sideLength/(2*Math.sqrt(1+slope**2))*scaleOffset;
        var yOffset = slope * xOffset;
        drawArrow(drawer, xOffset, yOffset);
        drawer.stroke();
        graph.appendChild(canvas);
    }   
}
/*
var x, y;

for (y = rows; y >= 1; y--) {
    for (x = 1; x <= cols; x++) {
        var canvas = document.createElement("CANVAS");
        canvas.height = sideLength;
        canvas.width = sideLength;
        var slope = -(x**2) / (y**2);
        var drawer = canvas.getContext("2d");
        var xOffset = sideLength/(2*Math.sqrt(1+slope**2))*scaleOffset;
        var yOffset = slope * xOffset;
        drawArrow(drawer, xOffset, yOffset);
        graph.appendChild(canvas);
    }   
}*/

function drawArrow(ctx, xOffset, yOffset) {
    var fromX = (sideLength/2)-xOffset, fromY = (sideLength/2)+yOffset, toX = (sideLength/2)+xOffset, toY = (sideLength/2)-yOffset;
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    var dx = toX - fromX;
    var dy = fromY - toY;
    if (dy == 0) {
        var angleInit = Math.PI/2;
    } else {
        var angleInit = Math.atan(Math.abs(dx/dy));
    }
    var arrowAngle = Math.PI/6;
    var arrowLength = 5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    if (dy <= 0) {
        ctx.lineTo(toX - (arrowLength * Math.sin(angleInit - arrowAngle)), toY - (arrowLength * Math.cos(angleInit - arrowAngle)));
        ctx.lineTo(toX - (arrowLength * Math.sin(angleInit + arrowAngle)), toY - (arrowLength * Math.cos(angleInit + arrowAngle)));
    } else {
        ctx.lineTo(toX - (arrowLength * Math.sin(angleInit - arrowAngle)), toY + (arrowLength * Math.cos(angleInit - arrowAngle)));
        ctx.lineTo(toX - (arrowLength * Math.sin(angleInit + arrowAngle)), toY + (arrowLength * Math.cos(angleInit + arrowAngle)));
    }
    ctx.fill();
}