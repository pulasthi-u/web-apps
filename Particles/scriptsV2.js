var stageDiv = document.getElementById('container');

var totalWidth = new Decimal(stageDiv.clientWidth);
var totalHeight = new Decimal(stageDiv.clientHeight);

function calculateParticlePos(x, y) {
    var newY = stageDiv.clientHeight - y;
    return [x, newY];
}

function Stage(div) {
    this.htmlElement = div;
    
    this.particles = [];
}

Stage.prototype.addParticle = function(particle) {
    this.particles.push(particle);
    this.htmlElement.appendChild(particle.htmlElement);
}

Stage.prototype.nextCollision = function() {
    var collisions = [];
    
    for (var firstParticleIndex = 0; firstParticleIndex < (this.particles.length - 1); firstParticleIndex++) {
        for (var secondParticleIndex = firstParticleIndex + 1; secondParticleIndex < this.particles.length; secondParticleIndex++) {
            var firstParticle = this.particles[firstParticleIndex];
            var secondParticle = this.particles[secondParticleIndex];
            
            var selfCollision = firstParticle.collisionWith(secondParticle);
            var firstParticleWallCollision = firstParticle.wallCollision();
            var secondParticleWallCollision = secondParticle.wallCollision();
            
            var earlierWallCollision = false;
            var earlierCollision = false;
            
            if (firstParticleWallCollision && secondParticleWallCollision) {
                if (firstParticleWallCollision.time.lessThan(secondParticleWallCollision.time)) {
                    earlierWallCollision = firstParticleWallCollision;
                } else {
                    earlierWallCollision = secondParticleWallCollision;
                }
            } else if (firstParticleWallCollision && !secondParticleWallCollision) {
                earlierWallCollision = firstParticleWallCollision;
            } else if (secondParticleWallCollision && !firstParticleWallCollision) {
                earlierWallCollision = secondParticleWallCollision;
            }
            
            if (earlierWallCollision && selfCollision) {
                if (earlierWallCollision.time.lessThan(selfCollision.time)) {
                    earlierCollision = earlierWallCollision;
                } else {
                    earlierCollision = selfCollision;
                }
            } else if (earlierWallCollision && !selfCollision) {
                earlierCollision = earlierWallCollision;
            } else if (selfCollision && !earlierWallCollision) {
                earlierCollision = selfCollision;
            }
            
            collisions.push(earlierCollision);
        }
    }
    
    var assumedMin = collisions[0];
    
    for (var i = 0; i < collisions.length; i++) {
        var time = collisions[i].time;
        if (time.lessThan(assumedMin.time)) {
            assumedMin = collisions[i];
        }
    }
    
    return assumedMin;
}

function Particle(x, y, mass, xVelocity = 0, yVelocity = 0) {
    var particleDiv = document.createElement("DIV");
    particleDiv.className = "particle";
    
    this.htmlElement = particleDiv;
    
    this.x = new Decimal(x);
    this.y = new Decimal(y);
    this.mass = new Decimal(mass);
    this.xVelocity = new Decimal(xVelocity);
    this.yVelocity = new Decimal(yVelocity);
    
    this.animText = "";
    
    var pos = calculateParticlePos(x, y);
    
    this.htmlElement.style.transform = `translateX(${pos[0]}px) translateY(${pos[1]}px)`;
    
    this.animation = [[], [], []]; // [[time], [x], [y]]
}

Particle.prototype.collisionWith = function(otherParticle) {
    var X1 = this.x;
    var X2 = otherParticle.x;
    var VX1 = this.xVelocity;
    var VX2 = otherParticle.xVelocity;
    
    var xTime = (X1.minus(X2)).dividedBy(VX2.minus(VX1));
    
    var Y1 = this.y;
    var Y2 = otherParticle.y;
    var VY1 = this.yVelocity;
    var VY2 = otherParticle.yVelocity;
    
    var yTime = (Y1.minus(Y2)).dividedBy(VY2.minus(VY1));
    
    if ((xTime.equals(yTime)) && !xTime.isNegative() && !xTime.equals(new Decimal(Infinity))) {
        return {
            particles: [this, otherParticle],
            time: xTime,
        };
    } else {
        return false;
    }
}

Particle.prototype.wallCollision = function() {    
    var rWallTime = (totalWidth.minus(this.x)).dividedBy(this.xVelocity);
    var lWallTime = (this.x.dividedBy(this.xVelocity)).negated();
    
    var horizontal;
    
    if (rWallTime.isPositive() && !rWallTime.equals(new Decimal(Infinity))) {
        horizontal = {
            particle: this,
            side: 'H', // Horizontal
            time: rWallTime,
        };
    } else if (lWallTime.isPositive() && !lWallTime.equals(new Decimal(Infinity))) {
        horizontal = {
            particle: this,
            side: 'H',
            time: lWallTime,
        }
    } else {
        horizontal = false;
    }
    
    var tWallTime = (totalHeight.minus(this.y)).dividedBy(this.yVelocity);
    var bWallTime = (this.y.dividedBy(this.yVelocity)).negated();
    
    var vertical;
    
    if (tWallTime.isPositive() && !tWallTime.equals(new Decimal(Infinity))) {
        vertical = {
            particle: this,
            side: 'V', // Vertical
            time: tWallTime,
        };
    } else if (bWallTime.isPositive() && !bWallTime.equals(new Decimal(Infinity))) {
        vertical = {
            particle: this,
            side: 'V',
            time: bWallTime,
        }
    } else {
        vertical = false;
    }
    
    if (horizontal && vertical) {
        if (horizontal.time.lessThan(vertical.time)) {
            return horizontal;
        } else {
            return vertical;
        }
    } else if (horizontal && !vertical) {
        return horizontal;
    } else if (vertical && !horizontal) {
        return vertical;
    } else {
        return false;
    }
}

var stg = new Stage(stageDiv);

for (var i = 0; i < 400; i++) {
    var x = new Decimal(Math.round(Math.random() * 700));
    var y = new Decimal(Math.round(Math.random() * 700));
    var xVel = new Decimal(Math.round(Math.random() * 70));
    var yVel = new Decimal(Math.round(Math.random() * 10));
    var particle = new Particle(x, y, 5, xVel, yVel);
    stg.addParticle(particle);
}

var cumulativeTime = new Decimal(0);

var repeats = 10;

for (var time = 0; time < repeats; time++) {
    var next = stg.nextCollision();
    
    cumulativeTime = cumulativeTime.plus(next.time);
    
    console.log("NXT", next.time+0);
    
    for (var i = 0; i < stg.particles.length; i++) {
        var part = stg.particles[i];
        var xChange = part.xVelocity.times(next.time);
        var yChange = part.yVelocity.times(next.time);
        part.animation[0].push(cumulativeTime);
        part.animation[1].push(part.x.plus(xChange));
        part.animation[2].push(part.y.plus(yChange));
        part.x = part.x.plus(xChange);
        part.y = part.y.plus(yChange);
    }
    
    if (next.side == 'V') {
        next.particle.yVelocity = next.particle.yVelocity.negated();
    } else if (next.side == 'H') {
        next.particle.xVelocity = next.particle.xVelocity.negated();
    } else if (next.particles) {
        var P1 = next.particles[0];
        var P2 = next.particles[1];
        var VX1 = (((new Decimal(2)).times(P2.mass.times(P2.xVelocity))).plus(P1.xVelocity.times(P1.mass.minus(P2.mass)))).dividedBy(P1.mass.plus(P2.mass));
        var VY1 = (((new Decimal(2)).times(P2.mass.times(P2.yVelocity))).plus(P1.yVelocity.times(P1.mass.minus(P2.mass)))).dividedBy(P1.mass.plus(P2.mass));
        var VX2 = (((new Decimal(2)).times(P1.mass.times(P1.xVelocity))).plus(P2.xVelocity.times(P2.mass.minus(P1.mass)))).dividedBy(P1.mass.plus(P2.mass));
        var VY2 = (((new Decimal(2)).times(P1.mass.times(P1.yVelocity))).plus(P2.yVelocity.times(P2.mass.minus(P1.mass)))).dividedBy(P1.mass.plus(P2.mass));
        P1.xVelocity = VX1;
        P1.yVelocity = VY1;
        P2.xVelocity = VX2;
        P2.yVelocity = VY2;
    }
}

for (var i = 0; i < stg.particles.length; i++) {
    var part = stg.particles[i];
    var animText = `@keyframes animation${i} {`;
    for (var j = 0; j < repeats; j++) {
        var time = part.animation[0][j];
        var x = part.animation[1][j];
        var y = part.animation[2][j];
        var pos = calculateParticlePos(x, y);
        var string = `${(time.dividedBy(cumulativeTime)).times(new Decimal(100))}% {transform: translateX(${pos[0]}px) translateY(${pos[1]}px) background-color: red;} `;
        animText = animText + string;
    }
    animText = animText + "}";
    part.animText = animText;
}

console.log(cumulativeTime+0);