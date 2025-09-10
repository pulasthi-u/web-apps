function adjust() {
    positionText();
    setTimeout(animateLoading, 2500);
}

function positionText() {
    var box = document.getElementById('content');
    box.style.marginTop = (window.innerHeight / 2) - (box.clientHeight / 2) + "px";
}

function addDots() {
    var textBox = document.getElementById('content').rows[1].cells[0];
    textBox.innerHTML = textBox.innerHTML + ".";
}

function removeDots() {
    var textBox = document.getElementById('content').rows[1].cells[0];
    textBox.innerHTML = textBox.innerHTML.replace('.', '');
}

function animateLoading() {
    for (counter = 1; counter < 4; counter++) {
        for (a = 1; a < 4; a++) {
            setTimeout(addDots, 500 * a * counter);
        }
        setTimeout(removeDots, 2000 * counter);
    }
}