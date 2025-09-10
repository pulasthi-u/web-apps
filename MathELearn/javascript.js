var learn = document.getElementById('learncards');
var revise = document.getElementById('revisecards');
var other = document.getElementById('other');

function verticalcenter(parentDiv, childDiv) {
    var parent = document.getElementById(parentDiv);
    var child = document.getElementById(childDiv);
    var parentHeight = parent.clientHeight;
    var childHeight = child.clientHeight;
    var margin = (parentHeight / 2) - (childHeight / 2);
    childDiv.style.marginTop = margin + "px";
}

function horizontalcenter(parentDiv, childDiv) {
    var parent = document.getElementById(parentDiv);
    var child = document.getElementById(childDiv);
    var parentWidth = parent.clientWidth;
    var childWidth = child.clientWidth;
    var margin = (parentWidth / 2) - (childWidth / 2);
    child.style.marginLeft = margin + "px";
}

function hidesp(firstDiv, secondDiv) {
    var height = calculate(firstDiv, 'height');
    document.getElementById(secondDiv).style.marginTop = "-" + height.replace('px', '') + "px";
}

function hide(firstDiv, secondDiv) {
    var height = document.getElementById(firstDiv).clientHeight;
    document.getElementById(secondDiv).style.marginTop = "-" + height + "px";
}

function hCenterBody (div) {
    var theDiv = document.getElementById(div);
    var width = body.clientWidth;
    var divWidth = theDiv.clientWidth;
    var margin = (width / 2) - (divWidth / 2);
    div.style.marginLeft = margin + "px";
}

function vCenterBody (div) {
    var theDiv = document.getElementById(div);
    var bodyHeight = window.innerHeight;
    var divHeight = theDiv.clientHeight;
    var margin = (bodyHeight / 2) - (divHeight / 2);
    theDiv.style.marginTop = margin + "px";
}

var theCards = ['one', 'two', 'three'];

function resize() {
    var other = document.getElementById('other');
    var container = document.getElementById('ccone');
    var width = (other.clientWidth) / 4.1;
    container.style.width = width + "px";
    for (index = 0; index < theCards.length; index++) {
        var cardback = "card" + theCards[index] + "b";
        var cardfront = "card" + theCards[index] + "f";
        document.getElementById(cardback).style.width = width + "px";
        document.getElementById(cardfront).style.width = width + "px";
        document.getElementById(cardback).style.height = (width * 1.45) + "px";
        document.getElementById(cardfront).style.height = (width * 1.45) + "px";
    }
}

function calculate(divid, property) {
    var result = window.getComputedStyle(document.getElementById(divid)).getPropertyValue(property);
    return result;
}

function handleKeys(event) {
    var key = event.which;
    if (key == 32) {
        spacebar(); // show the other side of a card
    }
    if (key == 13) {
        enter();
    }
}

var prevdivf = "cardonef";
var counter = 0;
var prevdivb = "cardoneb";
var spcounter = 0;
var furtherExecution = true;
var once = false;
var permission = false;

function enter() {
    if (permission) {               // Look to this. There has to be a better function
        permission = false;
        document.getElementById('other').style.display = "none";
        document.getElementById('revisecards').style.display = "block";
    }
    var toHide = "cards" + theCards[counter];
    document.getElementById(toHide).style.display = "none";
    counter = counter + 1;
    var toShow = "cards" + theCards[counter]; 
    document.getElementById(toShow).style.display = "block";
    var nextdivF = "card" + theCards[counter] + "f";
    var nextdivB = "card" + theCards[counter] + "b";
    hidesp(nextdivB, nextdivF);
    if ((nextdivB.includes('three')) && (once != true)) {
        once = true;
        permission = true;
    }
}

function spacebar() {
        nextdivF = "card" + theCards[counter] + "f";
        var nextdivB = "card" + theCards[counter] + "b";
        hidesp(nextdivB, nextdivF);
        var frontDiv = document.getElementById(nextdivF);
        var backDiv = document.getElementById(nextdivB);
        prevdivf = nextdivF;
        prevdivb = nextdivB;
        frontDiv.style.animationName = "hidecard";
        frontDiv.style.animationFillMode = "forwards";
        frontDiv.style.animationDuration = "0.8s";
        backDiv.style.animationName = "showcard";
        backDiv.style.animationDelay = "0.8s";
        backDiv.style.animationDuration = "0.8s";
        backDiv.style.animationFillMode = "forwards";
}

function getRandom(limit) {
    var random = (Math.random())*100;
    var rounded = Math.floor(random);
    var result = rounded % limit;
    return result;
}

function getOrder() {
    var order = "";
    do {
        var number = getRandom(3);
        if ((!order.includes(number))) {
            order = order + number + ",";
        }
    }  while (!((order.includes('0')) && (order.includes('1')) && (order.includes('2'))));
    alert(order);
    return order;
}

function arrangeRevise() {
    var orde = getOrder();
    var order = orde.split(',');
    var length = order.length;
    for (index = 0; index < length; index++) {
        
    }
}

function align() {
    hide('learncards', 'revisecards');
    hide('revisecards', 'other');
    resize();
    //vCenterBody('other');
    hidesp('cardoneb', 'cardonef');
    /*hidesp('cardonef', 'cardtwob');
    hidesp('cardtwob', 'cardtwof');
    hidesp('cardtwof', 'cardthreeb');
    hidesp('cardthreeb', 'cardthreef');*/
    horizontalcenter('other', 'ccone');
}