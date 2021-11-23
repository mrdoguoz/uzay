
function setup() {
    createCanvas(screen.width, screen.height);
  
    showLines = true;//çizgileri gosterır
    showUI = true;//sayıyı gosterır
    blur = true;//blurluyor
  
    slider = createSlider(1, 500, 200);
    //ekranın altındaki çizgi
    sliderBuffer = 150;
    slider.position(width / 2 - slider.width / 2, height - slider.height - sliderBuffer);
  
    swarm = new Array(slider.value());
    for (let i = 0; i < swarm.length; i++) {
      swarm[i] = new Entity(random(0, width), random(0, height));
    }
  
    blasts = [];
  }
  
  function draw() {
    //blur effect
    if (blur) {
      background(0, 80);
    } else {
      background(0);
    }
  
    handleBlasts();
    handleSwarm();
    
    for (let i = 0; i < swarm.length; i++) {
      swarm[i].display();
    }
  
    if (showUI) {
      displayFrameRate();
      displayPopulationSize();
    }
  }
  
  function handleBlasts() {//patlamaları idare etme
    if (blasts.length > 0) {
      for (let i = blasts.length - 1; i >= 0; i--) {
        if (blasts[i].lifePoints <= 0) {
          blasts.splice(i, 1);//var olan bir array e değer ekliyoruz
        } else {
          blasts[i].update();
          blasts[i].display();
        }
      }
    }
  }
  
  function handleSwarm() {
    if (swarm.length < slider.value()) {
      for (let i = 0; i <= slider.value() - swarm.length; i++) {
        swarm.push(new Entity(random(0, width), random(0, height)));
      }
    }
    if (swarm.length > slider.value()) {
      swarm.splice(slider.value(), swarm.length);
    }
    for (let i = 0; i < swarm.length; i++) {
      swarm[i].do();
    }
  }
  
  function displayPopulationSize() {
    textAlign(LEFT, BOTTOM);
    textSize(15);
    fill(255, 200);
    noStroke();
    text(swarm.length, width / 2 + slider.width / 2 + 10, height - 3 - sliderBuffer);
  }
  
  function displayFrameRate() {
    textAlign(LEFT, BOTTOM);
    var notRed = map(frameRate(), 30, 55, 0, 255); //frameRate: Attempt to refresh at starting
    textSize(15);
    fill(255, notRed, notRed, 200); //sol usttekı sayının rengi
    text(floor(frameRate()), 5, 17);//sol usttekı sayının yeri
  }
  
  function mouseClicked() {
  
    if (onSlider(mouseX, mouseY) && showUI) {
      return;
    }
    blasts.push(new Blast());
  
  }
  
  function onSlider(x, y) {
    if (y > height - slider.height - 2 * sliderBuffer) {
      if (x >= width / 2 - slider.width / 2 - sliderBuffer && x <= width / 2 + slider.width / 2 + sliderBuffer) {
        return true;
      }
    }
    return false;
  }
  
  function keyPressed() {
    if (key === "l" || key === "L") {
      showLines = !showLines;
    }
    if (key === "u" || key === "U") {
      showUI = !showUI;
      if (showUI) {
        slider.show();
      } else {
        slider.hide();
      }
    }
    if (key === "b" || key === "B") {
      blur = !blur;
    }
  }