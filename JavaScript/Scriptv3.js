class Set {
    
    constructor(elements) {
        this.elements = elements;
    }
    
    get showElements() {
        return this.elements
    }
    
    static union(set1, set2) {
        returnSet = []
        returnSet.concat(set1.elements);
        returnSet.concat(set2.elements);
    }
    
}