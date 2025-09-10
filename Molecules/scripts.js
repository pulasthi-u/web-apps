var stage = document.getElementById("stage");

var dpr = window.devicePixelRatio;

var canvas = document.createElement("CANVAS");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

stage.appendChild(canvas);

var ctx = canvas.getContext("2d");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
ctx.fill();

ctx.fillStyle = "black";

var LINEAR = 0, TRIGONAL_PLANAR = 1, TETRAHEDRAL = 2, TRIGONAL_BIPYRAMIDAL = 3, OCTAHEDRAL = 4;

var positionCodes = {
    TOP: 0,
    TOP_RIGHT: 1,
    RIGHT: 2,
    BOTTOM_RIGHT: 3,
    BOTTOM: 4,
    BOTTOM_LEFT: 5,
    LEFT: 6,
    TOP_LEFT: 7,
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7
};

var SINGLE = 0, DOUBLE = 1, TRIPLE = 2;

var electronPositions = 8;

// electrons is an object literal. Lone pairs at the four sides would be {TOP:2, RIGHT:2, BOTTOM:2, LEFT:2}

var atomFontSize = 25; // pixels
var chargeFontSize = 15;
var electronRadius = 2;
var electronDistance = 7;

var bondLength = 30;
var bondSeparation = 5;



// Atom Class

function Atom(element, electrons) {
    this.element = element;
    
    this.electrons = Array(electronPositions);
    
    for (var positionCodeIndex in Object.keys(electrons)) {
        var positionCode = Object.keys(electrons)[positionCodeIndex];
        
        var position = positionCodes[positionCode];
        var numberOfElectrons = electrons[positionCode];
        
        this.electrons[position] = numberOfElectrons;
    }
    
    this.bondsOriginating = {};
    this.bondsTerminating = {};
    
    this.drawn = false;
    
    this.chargeCircleRadius;
    this.charge;
    this.chargePosition;
    
    this.xCoordinate;
    this.yCoordinate;
}

Atom.prototype.giveCharge = function(charge, chargeCircleRadius, position = 45) {
    this.charge = charge;
    this.chargeCircleRadius = chargeCircleRadius;
    this.chargePosition = position;
}

// x, y give the midpoint of the atom

Atom.prototype.drawElectrons = function(ctx, electronShellRadius) {
    for (var position = 0; position < electronPositions; position++) {
        var numberOfElectronsToDraw = this.electrons[position];
        
        if (numberOfElectronsToDraw) {
            ctx.beginPath();
            
            var angle = ((2 * Math.PI)/electronPositions) * position;
            var baseXCoord = this.xCoordinate + (electronShellRadius * Math.sin(angle));
            var baseYCoord = this.yCoordinate - (electronShellRadius * Math.cos(angle));
            
            if (numberOfElectronsToDraw == 1) {
                ctx.arc(baseXCoord, baseYCoord, electronRadius, 0, 2 * Math.PI);
            } else if (numberOfElectronsToDraw == 2) {
                var xOffset = (electronDistance/2) * Math.cos(angle);
                var yOffset = (electronDistance/2) * Math.sin(angle);
                
                ctx.arc(baseXCoord - xOffset, baseYCoord - yOffset, electronRadius, 0, 2 * Math.PI);
                ctx.arc(baseXCoord + xOffset, baseYCoord + yOffset, electronRadius, 0, 2 * Math.PI);
            }
            
            ctx.fill();
        }
    }
}

Atom.prototype.drawCharge = function(ctx, x, y) {
    var chargeText;
    
    var charge = this.charge;
    
    if (Math.abs(charge) == 1) {
        chargeText = "";
    } else {
        chargeText = Math.abs(charge);
    }
    
    if (charge > 0) {
        chargeText += "+";
    } else if (charge < 0) {
        chargeText += "-";
    }
    
    ctx.font = atomFontSize + "px CMU Serif Roman";
    var atomTextWidth = ctx.measureText(this.element).width;
    
    ctx.font = chargeFontSize + "px CMU Serif Roman";
    var chargeTextWidth = ctx.measureText(chargeText).width;
    
    var angle = this.chargePosition * (Math.PI/180);
    
    var xCoord = x + (atomTextWidth/2 + chargeTextWidth/2 + 15) * Math.sin(angle);
    var yCoord = y - (atomTextWidth/2 + chargeTextWidth/2 + 15) * Math.cos(angle) + (chargeFontSize/2) + 1.5;
    
    if (this.chargeCircleRadius) {
        ctx.beginPath();
        ctx.arc(xCoord, yCoord - (chargeFontSize/2) - 1.5, this.chargeCircleRadius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    ctx.fillText(chargeText, xCoord, yCoord);
    
    ctx.font = atomFontSize + "px CMU Serif Roman"; // Reset font style to original
}

Atom.prototype.draw = function(ctx, x, y) {
    this.xCoordinate = x;
    this.yCoordinate = y;
    this.drawn = true;
    
    ctx.font = atomFontSize + "px CMU Serif Roman";
    ctx.textBaseline = "bottom";
    ctx.textAlign = "center";
    
    ctx.fillText(this.element, x, y + (atomFontSize/2) + 1.5);
    
    var electronShellDistance;
    
    var atomTextWidth = ctx.measureText(this.element).width;
    
    if (atomFontSize >= atomTextWidth) {
        electronShellDistance = (atomFontSize/2) + 3;
    } else {
        electronShellDistance = (atomTextWidth/2) + 3;
    }
    
    this.drawElectrons(ctx, electronShellDistance);
    
    if (this.charge != 0) {
        this.drawCharge(ctx, x, y);
    }
}

Atom.prototype.drawBonds = function(ctx, bondOriginationCircleRadius) {
    var bonds = this.bondsOriginating;
    var bondOriginationPointAngleDegrees;
    
    for (bondOriginationPointAngleDegrees in bonds) {
        var bondType = bonds[bondOriginationPointAngleDegrees][0];
        var bondOriginationPointAngle = (bondOriginationPointAngleDegrees * Math.PI)/180;
        
        ctx.beginPath();
        
        var baseBeginXCoord = this.xCoordinate + (bondOriginationCircleRadius * Math.sin(bondOriginationPointAngle));
        var baseBeginYCoord = this.yCoordinate - (bondOriginationCircleRadius * Math.cos(bondOriginationPointAngle));
    
        var baseEndXCoord = baseBeginXCoord + (bondLength * Math.sin(bondOriginationPointAngle));
        var baseEndYCoord = baseBeginYCoord - (bondLength * Math.cos(bondOriginationPointAngle));
    
        if (bondType == SINGLE) {
            ctx.moveTo(baseBeginXCoord, baseBeginYCoord);
            ctx.lineTo(baseEndXCoord, baseEndYCoord);
        } else if (bondType == DOUBLE) {
            var xOffset = (bondSeparation/2) * Math.cos(bondOriginationPointAngle);
            var yOffset = (bondSeparation/2) * Math.sin(bondOriginationPointAngle);
        
            ctx.moveTo(baseBeginXCoord - xOffset, baseBeginYCoord - yOffset);
            ctx.lineTo(baseEndXCoord - xOffset, baseEndYCoord - yOffset);
        
            ctx.moveTo(baseBeginXCoord + xOffset, baseBeginYCoord + yOffset);
            ctx.lineTo(baseEndXCoord + xOffset, baseEndYCoord + yOffset);
        } else if (bondType == TRIPLE) {
            ctx.moveTo(baseBeginXCoord, baseBeginYCoord);
            ctx.lineTo(baseEndXCoord, baseEndYCoord);
            
            var xOffset = bondSeparation * Math.cos(bondOriginationPointAngle);
            var yOffset = bondSeparation * Math.sin(bondOriginationPointAngle);
            
            ctx.moveTo(baseBeginXCoord - xOffset, baseBeginYCoord - yOffset);
            ctx.lineTo(baseEndXCoord - xOffset, baseEndYCoord - yOffset);
            
            ctx.moveTo(baseBeginXCoord + xOffset, baseBeginYCoord + yOffset);
            ctx.lineTo(baseEndXCoord + xOffset, baseEndYCoord + yOffset);
        }
        
        ctx.stroke();
    }
}

// bonds = {angle:[typeOfBond, otherAtom]}

Atom.prototype.addBonds = function(bonds) {
    this.bondsOriginating = {...this.bondsOriginating, ...bonds};
}

// bonds = [[typeOfBond, otherAtom]]

Atom.prototype.bondPolygonally = function(numberOfBonds, firstBondOriginationAngle, bonds) {
    var angleBetweenBonds = 360 / numberOfBonds;
    
    for (var bondIndex = 0; bondIndex < numberOfBonds; bondIndex++) {
        var currentBond = bonds[bondIndex];
        
        var bondOriginationAngle = firstBondOriginationAngle + (bondIndex * angleBetweenBonds);
        var typeOfBond = currentBond[0];
        var otherAtom = currentBond[1];
        
        this.addBonds({[bondOriginationAngle]:[typeOfBond, otherAtom]});
    }
}

// bonds = [[typeOfBond, otherAtom]]

Atom.prototype.predefinedBond = function(bondStructureCode, firstBondOriginationAngle, bonds) {
    if (bondStructureCode == LINEAR) {
        this.bondPolygonally(2, firstBondOriginationAngle, bonds);
    } else if (bondStructureCode == TRIGONAL_PLANAR) {
        this.bondPolygonally(3, firstBondOriginationAngle, bonds);
    } else if (bondStructureCode == TETRAHEDRAL) {
        this.addBonds({
            [firstBondOriginationAngle]:[bonds[0][0], bonds[0][1]]
        });
        this.addBonds({
            [firstBondOriginationAngle + 120]:[bonds[1][0], bonds[1][1]]
        });
        this.addBonds({
            [firstBondOriginationAngle + 190]:[bonds[2][0], bonds[2][1]]
        });
        this.addBonds({
            [firstBondOriginationAngle + 240]:[bonds[3][0], bonds[3][1]]
        });
    } else if (bondStructureCode == TRIGONAL_BIPYRAMIDAL) {
        this.addBonds({
            [firstBondOriginationAngle]:[bonds[0][0], bonds[0][1]]
        });
        this.addBonds({
            [firstBondOriginationAngle + 90]:[bonds[1][0], bonds[1][1]]
        });
        this.addBonds({
            [firstBondOriginationAngle + 180]:[bonds[2][0], bonds[2][1]]
        });
        this.addBonds({
            [firstBondOriginationAngle + 240]:[bonds[3][0], bonds[3][1]]
        });
        this.addBonds({
            [firstBondOriginationAngle + 300]:[bonds[4][0], bonds[4][1]]
        });
    } else if (bondStructureCode == OCTAHEDRAL) {
        this.bondPolygonally(6, firstBondOriginationAngle, bonds);
    }
}

// Molecule Class

function Molecule(...atoms) {
    this.atoms = atoms;
    this.referenceAtom = atoms[0];
}

// x, y coordinates to be given are those of the first atom added to the molecule

Molecule.prototype.drawAtom = function(atom, ctx, x, y) {
    var bonds = atom.bondsOriginating;
    var bondOriginationCircleRadius = ctx.measureText(atom.element).width/2 + 7;
    
    atom.draw(ctx, x, y);
    atom.drawBonds(ctx, bondOriginationCircleRadius);
    
    for (var bondOriginationPointAngleIndex in Object.keys(bonds)) {
        var otherAtomBondedTo = bonds[Object.keys(bonds)[bondOriginationPointAngleIndex]][1];
        
        if (!otherAtomBondedTo.drawn) {
            var bondOriginationPointAngle = (Object.keys(bonds)[bondOriginationPointAngleIndex]) * (Math.PI/180);
            
            var otherAtomTextWidth = ctx.measureText(otherAtomBondedTo.element).width;
            
            var xCoord = x + ((bondLength + bondOriginationCircleRadius + otherAtomTextWidth/2 + 7) * Math.sin(bondOriginationPointAngle));
            var yCoord = y - ((bondLength + bondOriginationCircleRadius + otherAtomTextWidth/2 + 7) * Math.cos(bondOriginationPointAngle));
            
            this.drawAtom(otherAtomBondedTo, ctx, xCoord, yCoord);
        }
    }
}

Molecule.prototype.draw = function(ctx, x, y) {
    this.drawAtom(this.referenceAtom, ctx, x, y);
}

Molecule.prototype.writeToFile = function(canvas) {
    var image = canvas.toDataURL("image/png");
    
    var a = document.createElement("IMG");
    a.src = image;
    stage.appendChild(a);
}

function bond(centralAtom, bonds) { // {0:[SINGLE, otherAtom]}
    centralAtom.bondsOriginating = {...centralAtom.bondsOriginating, ...bonds};
}

var C1 = new Atom("C", {});
var C2 = new Atom("C", {});
var O1 = new Atom("O", {LEFT:2, RIGHT:2});
var O2 = new Atom("O", {TOP_RIGHT:2, BOTTOM_LEFT:2});
var O3 = new Atom("O", {BOTTOM_RIGHT:2, TOP_LEFT: 2});
var H1 = new Atom("H", {});
var H2 = new Atom("H", {});

var H3 = new Atom("H", {});
var H4 = new Atom("H", {});
var H5 = new Atom("H", {});
var H6 = new Atom("H", {});

C2.predefinedBond(TETRAHEDRAL, 0, [[SINGLE, H3], [SINGLE, H4], [SINGLE, H5], [SINGLE, H6]]);

C1.predefinedBond(TRIGONAL_PLANAR, 0, [[DOUBLE, O1], [SINGLE, O2], [SINGLE, O3]]);

O2.addBonds({120:[SINGLE, H1]});
O3.addBonds({240:[SINGLE, H2]});

var methane = new Molecule(C2, H3, H4, H5, H6);

var carbonate = new Molecule(C1, O1, O2, O3);

carbonate.draw(ctx, 200, 500);

methane.draw(ctx, 300, 300);