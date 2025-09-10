var stage = document.getElementById('stage');

var ON = 1, OFF = 0;

function StateDisplay() {
    var display = document.createElement("DIV");
    display.className = "stateDisplay";
    this.display = display;
    
    return display;
}

function StateConnector() {
    var connector = document.createElement("DIV");
    connector.className = "stateConnector";
    this.connector = connector;
    
    return connector;
}

function StateTextContainer() {
    var textContainer = document.createElement("SPAN");
    textContainer.className = "stateTextContainer";
    this.textContainer = textContainer;
    
    return textContainer;
}

function State() {
    this.display = new StateDisplay();
    this.connector = new StateConnector();
    this.textContainer = new StateTextContainer();
    
    this.display.appendChild(this.connector);
    this.display.appendChild(this.textContainer);
    
    stage.appendChild(display);
    
    this.state = 0;
}



function Input() {
    var onStage = document.createElement("DIV");
    onStage.className = "input";
    
    onStage.onmousedown = function() {
        var newThis = this;
        document.onmousemove = function() {
            newThis.style.transform = `translateX(${event.clientX - newThis.clientWidth/2}px) translateY(${event.clientY - newThis.clientHeight/2}px)`;
            document.onmouseup = function() {
                document.onmousemove = null;
            }
        }
    }
    
    onStage.onclick = function() {
        this.changeState();
    };
    
    onStage.innerHTML = "<span class='inputLabel'>0</span>";
    
    stage.appendChild(onStage);
    
    this.onStage = onStage;
    
    this.state = 0;
    this.connections = [];
}

Input.prototype.setState = function(newState) {    
    this.state = newState;
    this.onStage.innerHTML = `<span class='inputLabel'>${newState}</span>`;
    this.connections.forEach(function(item, index) {
        item.update();
    });
}

Input.prototype.changeState = function() {
    this.state = ~this.state;
    this.onStage.innerHTML = `<span class='inputLabel'>${this.state}</span>`;
}

Input.prototype.connectTo = function(gate) {
    this.connections.push(gate);
    gate.inputs.push(this);
}

var AND = 0, OR = 1, NOT = 2;

function LogicGate(type) {
    this.type = type;
    this.inputs = [];
    this.currentState = new Input();
}

LogicGate.prototype.addInput = function(input) {
    this.inputs.push(input);
    input.connections.push(this);
}

LogicGate.prototype.update = function() {
    var output;
    
    if (this.type == AND) {
        output = this.inputs[0].state & this.inputs[1].state;
        
        this.inputs.forEach(function(item, index) {
            if (index >= 2) {
                output = output & item.state;
            }
        });
    } else if (this.type == OR) {
        output = this.inputs[0].state | this.inputs[1].state;
        
        this.inputs.forEach(function(item, index) {
            if (index >= 2) {
                output = output | item.state;
            }
        });
    } else if (this.type == NOT) {
        output = ~this.inputs[0].state
    }
    
    this.currentState.setState(output);
    
    return output;
}

var A = new StateDisplay();