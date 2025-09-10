function formAnimation() {
    var ball = document.getElementById('ball');
    styles = document.getElementsByTagName('style')[0];
    styles.innerHTML = "";
    var stuff = "@keyframes trajectory {";
    var angle = parseInt(document.getElementById('angle').value);
    var velocity = parseInt(document.getElementById('velocity').value);
    var timeEnd = parseInt(document.getElementById('time').value);
    var acceleration = parseInt(document.getElementById('acceleration').value) / 2;
    var interceptTextBox = document.getElementById('intercept').value;
    alert(interceptTextBox);
    if (interceptTextBox != "") {
        alert("HERE");
        var intercept = parseInt(interceptTextBox);
    } else {
        var intercept = 0;
    }
    var sinAngle = Math.sin((angle * Math.PI) / 180);
    var cosineAngle = Math.cos((angle * Math.PI) / 180);
    var increment = 0.1;
    for (var time = 0; time < timeEnd + increment; time+= increment) {
        if (time > timeEnd) {
            time = timeEnd;
        }
        console.log(time);
        var percentage = (time / timeEnd) * 100;
        var positionY1 = sinAngle * velocity * time;
        var positionX = cosineAngle * velocity * time;
        var positionY = positionY1 - (acceleration * (time * time));
        var string = percentage + "% {transform: translateY(calc(50vh - " + (20 + positionY+intercept) + "px)) translateX(" + positionX + "px);} ";
        stuff = stuff + string;
    }
    styles.innerHTML = stuff + "}";
    setTimeout(function() {
        ball.style.animationDuration = timeEnd + "s";
        ball.style.animationName = "trajectory";
    }, 1000);
}

function resetAnimation() {
    document.getElementById('ball').style.animationName = "";
}