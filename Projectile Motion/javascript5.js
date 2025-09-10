function animateProjectile() {
    var screen = document.getElementById('screen');
    var screenHeight = screen.clientHeight - 20; // 20px = padding
    var screenWidth = screen.clientWidth - 20;
    console.log(screenWidth);
    
    var initialVelocity = parseFloat(document.getElementById('initialVelocity').value);
    var angle = parseFloat(document.getElementById('angle').value) * Math.PI / 180;
    var time = parseFloat(document.getElementById('time').value);
    var gravity = parseFloat(document.getElementById('gravity').value);
    var verticalVelocity = Math.sin(angle) * initialVelocity;
    var horizontalVelocity = Math.cos(angle) * initialVelocity;
    
    var peakHeight = (verticalVelocity ** 2) / (2 * gravity);
    var peakFall = (verticalVelocity * time) - (0.5 * gravity * (time ** 2));
    var totalHorizontalDistance = horizontalVelocity * time;

    if (peakFall >= 0) {
        peakFall = 0;
    }
    
    var totalHeight = peakHeight - peakFall;
    var heightScale = screenHeight / totalHeight;
    var widthScale = screenWidth / totalHorizontalDistance;
    
    var projectile = document.createElement("DIV");
    projectile.style.transform = 'translateY(calc(75vh - 60px + ' + (peakFall * heightScale) + 'px))';
    projectile.id = "projectile";
    screen.appendChild(projectile);
    
    var smoothness = 0.5;
    
    var animationString = "";
    
    for (var iteration = 0; iteration <= 100; iteration += smoothness) {
        var currentTime = (iteration / 100) * time;
        var horizontalDistance = heightScale * horizontalVelocity * currentTime;
        var verticalDistance = heightScale * ((verticalVelocity * currentTime) - (0.5 * gravity * (currentTime ** 2)));
        var animationStatement = iteration + '% {transform: translateY(calc(75vh - 60px - ' + verticalDistance + 'px + ' + (peakFall * heightScale) + 'px)) translateX(' + horizontalDistance + 'px);}';
        animationString += animationStatement;
    }

    var groundLevelLine = document.createElement("HR");
    groundLevelLine.style.transform = 'translateY(calc(75vh - 1px + ' + (peakFall * heightScale) + 'px))';
    groundLevelLine.id = "groundLevelLine";
    screen.appendChild(groundLevelLine);
    
    screen.style.overflowY = 'hidden';
    
    var styles = document.getElementsByTagName('STYLE')[0];
    styles.innerHTML = "@keyframes projectileAnimation {" + animationString + "}";
    
    projectile.style.animationName = 'projectileAnimation';
    projectile.style.animationDuration = time + "s";
}