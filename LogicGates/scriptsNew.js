var stage = document.getElementById('stage');

var AND_GATE = 0;
var OR_GATE = 1;
var NOT_GATE = 2;

function LogicGate(gateType, numInputs) {
    this.gateType = gateType;
    this.numInputs = numInputs;
    this.inputs = [];
    
    var outputElement = document.createElement("INPUT");
    outputElement.type = "checkbox";
    outputElement.disabled = true;
    this.output = outputElement;
    
    var body = document.createElement("DIV");
    var inputsRegion = document.createElement("DIV");
    var outputsRegion = document.createElement("DIV");
    body.className = "logicGate";
    inputsRegion.className = "inputs";
    outputsRegion.className = "outputs";
    outputsRegion.appendChild(outputElement);
    body.appendChild(inputsRegion);
    body.appendChild(outputsRegion);
    this.body = body;
    this.inputsRegion = inputsRegion;
    this.outputsRegion = outputsRegion;
    
    stage.appendChild(body);
}

function print() {
    console.log('printing');
}

LogicGate.prototype.addInputs = function(inputs) {
    var i = 0;
    var lastIndex = 0;
    if (inputs.length < this.numInputs) {
        lastIndex = inputs.length;
    } else if (inputs.length >= this.numInputs) {
        lastIndex = this.numInputs;
    }
    for (i = 0; i < lastIndex; i++) {
        inputs[i].addEventListener('change', generatefunc(this));
        this.inputs.push(inputs[i]);
    }
    for (i; i < this.numInputs; i++) {
        var inputElement = document.createElement("INPUT");
        inputElement.type = "checkbox";
        inputElement.addEventListener('change', generatefunc(this));
        this.inputs.push(inputElement);
        this.inputsRegion.appendChild(inputElement);
    }
}

function evaluate(gateType, inputs) {
    if (gateType == AND_GATE) {
        return (inputs[0] & inputs[1]);
    } else if (gateType == OR_GATE) {
        return (inputs[0] | inputs[1]);
    } else if (gateType == NOT_GATE) {
        return ~inputs[0];
    }
}

//LogicGate.prototype.setOutput = 
function generatefunc(something) {
    var retFunc = function outputThing() {
        //this = something;
        //console.log(this);
        var result;
        if (something.numInputs > 1) {
            result = evaluate(
                something.gateType,
                [
                    something.inputs[0].checked,
                    something.inputs[1].checked
                ]
            );
            for (var i = 2; i < something.numInputs; i++) {
                result = evaluate(
                    something.gateType,
                    [
                        something.inputElements[i].checked,
                        result
                    ]
                );
            }
        } else if (something.numInputs == 1) {
            result = evaluate(
                something.gateType,
                [something.inputs[0].checked]
            );
        }

        something.output.checked = result;
        something.output.dispatchEvent(new Event('change'));
    };
    return retFunc;
}