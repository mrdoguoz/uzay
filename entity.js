class Entity {
	constructor(posX, posY){
    	this.location = createVector(posX, posY);
        this.acceleration = createVector();
  		this.velocity = createVector();
        this.maxSpeed = 3.7;
        this.maxSteeringForce = 0.07;
  	}
    
    do(){
        this.seek();
        this.separate();
        this.update();
    }
    
    seek(){
    	var desired = createVector(mouseX, mouseY).sub(this.location);//mouseX, mouseY den this.location u çıkarıyoruz
        //console.log(desired)
        desired.setMag(this.maxSpeed); //magnitude set büyüklük 
        //console.log(desired.setMag(this.maxSpeed))
        //mouseX, mouseY yerine göre büyüklük belirliyoruz
        //https://www.geeksforgeeks.org/p5-js-mag-function/

        var steeringForce = desired.sub(this.velocity); //direksiyon kuvveti velocity:hız, sürat demek
        steeringForce.setMag(this.maxSteeringForce); //magnitude set büyüklük 
        //https://p5js.org/reference/#/p5.Vector/sub
        
        this.applyForce(steeringForce); //steeringForce u entity ye uyguluyoruz
        //console.log(this)
    }
    
    separate(){
        var desiredseparation = 10;
  		var steeringForce = createVector();
  		var count = 0;
        var diff;
        var d;
        
        for (let i = 0; i < swarm.length; i++) {
            // Array(slider.value());
        	d = p5.Vector.dist(this.location,swarm[i].location); //entity ıle her bır swarm ın arasındakı mesafeyı buluyoruz
            //https://p5js.org/reference/#/p5.Vector/dist
            
            if ((d > 0) && (d < desiredseparation)) {	
              	diff = p5.Vector.sub(this.location, swarm[i].location);
              	diff.normalize(); //https://p5js.org/reference/#/p5.Vector/normalize
              	diff.div(d);        // Weight by distance diff/d
              	steeringForce.add(diff); //steeringForce + diff
              	count++;            
            }
        }
        
        if (count > 0) {
            steeringForce.div(count);
        }
  
  		if (steeringForce.mag() > 0) {
            steeringForce.setMag(this.maxSteeringForce);
            this.applyForce(steeringForce);
        }
    }
    
    applyForce(force){
        this.acceleration.add(force); //acceleration = hızlanma, ivme
    }
    
    update(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed); //https://p5js.org/reference/#/p5.Vector/limit
        this.location.add(this.velocity);
        this.acceleration.mult(0); //ivmeyi sıfırlıyor, sıfır ile çarpıyor
    }
    
    display(){
        //https://p5js.org/reference/#/p5/stroke
        stroke(255);//rengi belirliyor
        strokeWeight(2);//Sets the width of the stroke used for lines, points, and the border around shapes. All widths are set in units of pixels.
        point(this.location.x, this.location.y);//nokta koyuyor
        strokeWeight(1);
        stroke(255, 20);
        if(showLines){
            //çizgileri göster ise 
        	line(this.location.x, this.location.y, width, 0);
        	line(this.location.x, this.location.y, 0, height);
        }
    }
}