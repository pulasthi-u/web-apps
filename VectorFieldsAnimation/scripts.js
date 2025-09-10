var space = document.getElementById("space");

var rows = 11; cols = 11;

space.style.gridTemplateColumns = "repeat(" + cols + ", 1fr)";
space.style.gridTemplateRows = "repeat(" + rows + ", 1fr)";

var sideLength = space.clientHeight / rows;

function f(x, y, t) {
    var i = y*t;
    var j = x+y;
    return {
        i: i,
        j: j,
        magnitude: Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2)),
        slope: j/i,
    };
}

var canvases;

function addCages() {
    console.log("CALLED");
    var rowInit = (rows - 1)/2, colInit = (cols - 1)/2;
    for (var y = rowInit; y >= -rowInit; y--) {
        for (var x = -colInit; x <= colInit; x++) {
            
            var cage = document.createElement("CANVAS");
            cage.width = sideLength;
            cage.height = sideLength;
            //var ctx = cage.getContext("2d");
            cage.style.border = "1px solid black";
            
            space.appendChild(cage);
            
        }
    }
    
    canvases = document.getElementsByTagName("CANVAS");
}

addCages();

/*for (var index = 0; index < rows*cols; index++) {
    
}*/

var ind = 0;

while (ind <= 5) {
    console.log(ind);
    var ctx = canvases[ind].getContext("2d");
    setInterval(function() {
        var t = new Date().getMilliseconds();
        ctx.clearRect(0,0,sideLength,sideLength);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(t*100, t*100);
        ctx.stroke();
    }, 500);
    console.log(ctx);
    ind++;
};

/*
setInterval(function() {
    var cage = canvases[index+1];
    var ctx = cage.getContext("2d");
    var t = new Date().getMilliseconds()/30;
    ctx.clearRect(0,0,sideLength,sideLength);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(t, t);
    ctx.stroke();
}, 100);*/