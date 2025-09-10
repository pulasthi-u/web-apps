class MathExpression extends HTMLElement {
    constructor() {
        super();
        var shadow=this.attachShadow({mode: 'open'});
        var area=document.createElement("SPAN");
        console.log(shadow);
        //area.innerHTML=this.prototype.textContent;
        area.style="display: block; width: 15vw;";
        shadow.appendChild(area);
    }
}

class Numerator extends HTMLElement {
    constructor() {
        super();
        var shadow=this.attachShadow({mode: 'open'});
        var row=document.createElement("TR");
        var cell=document.createElement("TD");
        cell.textContent=this.prototype.textContent;
        row.appendChild(cell);
        shadow.appendChild(row);
    }
}

class Denominator extends HTMLElement {
    constructor() {
        super();
        var shadow=this.attachShadow({mode: 'open'});
        var row=document.createElement("TR");
        var cell=document.createElement("TD");
        cell.textContent=this.prototype.textContent;
        row.appendChild(cell);
        shadow.appendChild(row);
    }
}

class Fraction extends HTMLElement {
    constructor() {
        super();
        var shadow=this.attachShadow({mode: 'open'});
        var element=document.createElement("TABLE");
        var numerator=this.getElementsByTagName('math-numerator')[0];
        element.appendChild(numerator);
        var denominator=this.getElementsByTagName('math-denominator')[0];
        element.appendChild(denominator);
        shadow.appendChild(element);
    }
}

customElements.define('math-expression', MathExpression);
customElements.define('math-numerator', Numerator);
customElements.define('math-denominator', Denominator);
customElements.define('math-fraction', Fraction);