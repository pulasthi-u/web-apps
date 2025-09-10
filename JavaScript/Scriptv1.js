class Person {
    constructor(name) {
        this.name = name;
    }
    
    feed(eatFunc) {
        eatFunc();
    }
}

class Mouth {
    constructor(name) {
        this.name = name;
    }
    
    bite() {
        alert("I bit");
    }
}

function eat(mouth) {
    mouth.bite();
}

const Pula = new Person("Pulasthi");