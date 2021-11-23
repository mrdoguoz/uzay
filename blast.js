class Blast {
	constructor(){
        this.maxLifePoints = 80;
        this.lifePoints = this.maxLifePoints;
        this.radius=1;
        this.location = createVector(mouseX, mouseY);
    }
    
    update(){        
        this.lifePoints -= 1;
        var softener = 3; 			//higher values make intensity go down more slowly (see graph calculatos)
        this.intensity = 1/(this.maxLifePoints-this.lifePoints+softener);
        this.radius += this.intensity*70;
        this.repel();
    }
    
    repel(){
        var connection;
        var distance;
        var repelForce;
        for(let i = 0; i < swarm.length; i++){
            connection = p5.Vector.sub(swarm[i].location, this.location);
            distance = connection.mag();
            if (distance <= this.radius*1.8) {
                repelForce = connection.setMag(this.intensity*6);
                swarm[i].applyForce(repelForce);
            }
        }
    }
    
    display(){
        var opacity = map(this.lifePoints, this.maxLifePoints, 0, 200, 0);
        noFill();
        stroke(255, opacity);
        //https://p5js.org/reference/#/p5/stroke
        strokeWeight(map(this.lifePoints, this.maxLifePoints, 0, 1, 20));
        circle(this.location.x, this.location.y, this.radius);
    }
}