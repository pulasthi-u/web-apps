var stage = document.getElementById('container');
var totalHeight = stage.clientHeight, totalWidth = stage.clientWidth;

var canvas = document.createElement("CANVAS");
canvas.height = totalHeight;
canvas.width = totalWidth;

var ctx = canvas.getContext('2d');
// ctx.translate(totalWidth/2, totalHeight/2);
ctx.translate(0, totalHeight);
ctx.transform(1, 0, 0, -1, 0, 0);

stage.appendChild(canvas);

function Particle(x, y, mass, radius, xVelocity = 0, yVelocity = 0) {
    this.x = new Decimal(x);
    this.y = new Decimal(y);
    this.mass = new Decimal(mass);
    this.radius = new Decimal(radius);
    
    this.xVelocity = new Decimal(xVelocity);
    this.yVelocity = new Decimal(yVelocity);
}

Particle.prototype.collisionWith = function(otherParticle) {
    var xTime = 0, yTime = 0;
    
    var x1 = this.x;
    var x2 = otherParticle.x;
    var v1 = this.xVelocity;
    var v2 = otherParticle.xVelocity;
    xTime = (x1.minus(x2)).dividedBy(v2.minus(v1));
    
    var y1 = this.y;
    var y2 = otherParticle.y;
    v1 = this.yVelocity;
    v2 = otherParticle.yVelocity;
    yTime = (x1.minus(x2)).dividedBy(v2.minus(v1));

    if (xTime.equals(yTime) && (xTime.isPositive()) && !(xTime.equals(new Decimal(Infinity)))) {
        var v1x = (((new Decimal(2)).times(otherParticle.mass.times(otherParticle.xVelocity))).plus(this.xVelocity.times(this.mass.minus(otherParticle.mass)))).dividedBy(this.mass.plus(otherParticle.mass));
        var v1y = (((new Decimal(2)).times(otherParticle.mass.times(otherParticle.yVelocity))).plus(this.yVelocity.times(this.mass.minus(otherParticle.mass)))).dividedBy(this.mass.plus(otherParticle.mass));
        var v2x = (((new Decimal(2)).times(this.mass.times(this.xVelocity))).plus(otherParticle.xVelocity.times(otherParticle.mass.minus(this.mass)))).dividedBy(this.mass.plus(otherParticle.mass));
        var v2y = (((new Decimal(2)).times(this.mass.times(this.yVelocity))).plus(otherParticle.yVelocity.times(otherParticle.mass.minus(this.mass)))).dividedBy(this.mass.plus(otherParticle.mass));
        return {
            time: xTime,
            selfX: v1x,
            selfY: v1y,
            otherX: v2x,
            otherY: v2y,
        };
    } else {
        return false;
    }
}

Particle.prototype.wallCollision = function() {
    var W = new Decimal(totalWidth);
    var H = new Decimal(totalHeight);
    
    var rWallTime = (W.minus(this.x)).dividedBy(this.xVelocity);
    var lWallTime = this.x.dividedBy(this.xVelocity).negated();
    var tWallTime = (H.minus(this.y)).dividedBy(this.yVelocity);
    var bWallTime = this.y.dividedBy(this.yVelocity).negated();
    
    var times = [[rWallTime, 'S'], [lWallTime, 'S'], [tWallTime, 'T'], [bWallTime, 'T']]; // s = side, t = top/bottom
    
    var min = 0;
    var assumedMin = new Decimal(0);
    
    for (var i = 0; i < 4; i++) {
        var time = times[i][0];
        if ((time.isPositive()) && time.lessThan(assumedMin)) {
            min = i;
            assumedMin = times[i][0];
        }
    }
    
    console.log(assumedMin + 0);
    
    return times[min];
}

Particle.prototype.setVelocities = function(xVel, yVel) {
    this.xVel = new Decimal(xVel);
    this.yVel = new Decimal(yVel);
}

Particle.prototype.move = function(time) {
    var xChange = this.xVelocity.times(time);
    var yChange = this.yVelocity.times(time);
    
    this.x = this.x.plus(xChange);
    this.y = this.y.plus(yChange);
}

Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.fill();
}

function findMinIndex(array) {
    var minElement = array[0];
    var minIndex = 0;
    for (var i = 1; i < array.length; i++) {
        var currentElement = array[i];
        if (currentElement < minElement) {
            minElement = array[i]
            minIndex = i;
        }
    }
    return minIndex;
}

function Stage() {
    this.particles = [];
}

Stage.prototype.addParticles = function(particles) {
    this.particles.push(...particles);
    
    for (var i = 0; i < this.particles.length; i++) {
        var p = this.particles[i];
        p.draw();
    }
}

Stage.prototype.addParticle = function(particle) {
    this.particles.push(particle);
    
    particle.draw();
}

Stage.prototype.nextCollision = function() {
    var collisions = [[], []]; // [[times], [[particle1, particle2]]]
    var wallCollisions = [[], []]; // [[times], [walls]]
    
    for (var firstParticleIndex = 0; firstParticleIndex < (this.particles.length - 1); firstParticleIndex++) {
        var firstParticle = this.particles[firstParticleIndex];
        
        for (var secondParticleIndex = firstParticleIndex + 1; secondParticleIndex < this.particles.length; secondParticleIndex++) {
            var secondParticle = this.particles[secondParticleIndex];
            
            var collision = firstParticle.collisionWith(secondParticle);
            
            if (collision.time) {
                collisions[0].push(collision.time);
                collisions[1].push({
                    firstParticle: firstParticle,
                    secondParticle: secondParticle,
                    firstX: collision.selfX,
                    firstY: collision.selfY,
                    secondX: collision.otherX,
                    secondY: collision.otherY,
                });
            }
            
            var firstParticleWallCollision = firstParticle.wallCollision();
            var secondParticleWallCollision = secondParticle.wallCollision();
            
            if (firstParticleWallCollision[0].lessThanOrEqualTo(secondParticleWallCollision[0])) {
                wallCollisions[0].push(firstParticleWallCollision[0]);
                wallCollisions[1].push([firstParticle, firstParticleWallCollision[1]]);
            } else {
                wallCollisions[0].push(secondParticleWallCollision[0]);
                wallCollisions[1].push([secondParticle, secondParticleWallCollision[1]]);
            }
        }
    }
    
    var minWallIndex = findMinIndex(wallCollisions[0]);
    var minWallTime = wallCollisions[0][minWallIndex];
    
    if (collisions[0][0]) {
        var minIndex = findMinIndex(collisions[0]);
        var minCollTime = collisions[0][minIndex];
        if (minCollTime.lessThanOrEqualTo(minWallTime)) {
            return {
                type: 'P',
                time: collisions[0][minIndex],
                particles: collisions[1][minIndex],
            };
        } else {
            return {
                type: 'W',
                time: minWallTime,
                particle: wallCollisions[1][minIndex][0],
                wall: wallCollisions[1][minIndex][1],
            };
        }
    } else {
        return {
            type: 'W',
            time: minWallTime,
            particle: wallCollisions[minWallIndex][1][0],
            wall: wallCollisions[minWallIndex][1][1],
        };
        // return false; // No collisions shall happen
    }
}

var myStage = new Stage();

for (var i = 0; i < 100; i++) {
    var particle = new Particle(Math.round(Math.random()*300) + 100, Math.round(Math.random()*300) + 100, 5, 2, Math.round(Math.random()*40), Math.round(Math.random()*40));
    myStage.addParticle(particle);
}

for (var i = 0; i < 100; i++) {
    var particle = new Particle(Math.round(Math.random()*300) + 100, Math.round(Math.random()*300) + 100, 5, 2, Math.round(-Math.random()*40), -Math.round(Math.random()*40));
    myStage.addParticle(particle);
}

////////////////////////

var currentTime = new Decimal(0);
var increment = new Decimal(0.2);


if (myStage.nextCollision()) {
    var timeToAnimateUpto = new Decimal(myStage.nextCollision().time);
} else {
    console.log("NO COLLISION");
}

function animate() {
    if (currentTime.lessThanOrEqualTo(timeToAnimateUpto)) {
        ctx.clearRect(0, 0, totalWidth, totalHeight);
        for (var i = 0; i < myStage.particles.length; i++) {
            var p = myStage.particles[i];
            p.move(increment);
            p.draw();
        }
        currentTime = currentTime.plus(increment);
        window.requestAnimationFrame(animate);
    }
}

var times = 0;

function mainLoop() {
    var particlesToCollide;
    
    currentTime = new Decimal(0);
    
    animate();
    
    var result = myStage.nextCollision();
    
    if (result) {
        var type = result.type;
        timeToAnimateUpto = new Decimal(result.time);
        
        if (type == 'P') {
            particlesToCollide = result.particles;

            var p1 = particlesToCollide.firstParticle;
            var p2 = particlesToCollide.secondParticle;
        
            p1.setVelocities(particlesToCollide.firstX, particlesToCollide.firstY);
            p2.setVelocities(particlesToCollide.secondX, particlesToCollide.secondY);
        } else if (type == 'W') {
            var particle = result.particle;
            var wall = result.wall;
            if (wall == 'S') {
                particle.xVelocity = particle.xVelocity.negated();
            } else if (wall == 'T') {
                particle.yVelocity = particle.yVelocity.negated();
            }
        }
    } else {
        timeToAnimateUpto = false;
        console.log("NO COLLISION");
    }
    
    times++;
    
    if (times < 120) {
        window.requestAnimationFrame(mainLoop);
    } else {
        console.log("END");
    }
}

// mainLoop();