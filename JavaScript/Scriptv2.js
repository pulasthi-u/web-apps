class Leg {
    
    constructor(legSide) {
        this.side = legSide;
    }
    
    move() {
        console.log("I moved my " + this.side + " leg.");
    }
    
}

var rLeg = new Leg('right');
var lLeg = new Leg('left');

class Person {
    
    constructor(fname, lname, yearBirth) {
        this.firstName = fname;
        this.lastName = lname;
        this.age = 2017 - yearBirth;
        this.rightLeg = rLeg;
        this.leftLeg = lLeg;
    }
    
    walk(legMoveFunction) {
        legMoveFunction(this.leftLeg, this.rightLeg);
    }
    
}