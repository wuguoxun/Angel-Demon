let a = 30;
let b = 30;
let s;
let k;
let scl = 20;
let color = 0;
let player = [{
  name: "Player White"
}, {
  name: "Player Black"
}];
let food;
let score = 0;
let state = 'go';
// let soundClassifier;


// function preload() {
//   const options = {
//     probabilityThreshold: 0.95
//   };
//   soundClassifier = ml5.soundClassifier('SpeechCommands18w', options);
// }


function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(64);
  textAlign(CENTER, CENTER);
  s = new Snake();
  k = new Snake();
  frameRate(10);
  pickLocation();
  // soundClassifier.classify(gotCommand);

}

function pickLocation() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}


function draw() {

  switch (state) {
    case ('go'):
      go();
      break;
    case ('play'):
      play();
      break;
    case ('won'):
      won();
      break;
  }
}

function go() {
  background(93, 124, 161);
  fill(67, 71, 62);
  text('Click To Start', width / 2, height / 2);
  text('Player 1: White / Arrow Control', width /2, height/1.2);
  text('Player 2: Black / W,S,A,D', width /2, height/1.5);
}

function play() {
  background(118, 153, 129);
  textSize(16);
  textAlign(LEFT);
  fill(255);
  text('RULES:', width * .84, 40);
  text('NO BACKWARD', width * .84, 60);
  text('DONT HIT THE WALL', width * .84, 80);
  text('DONT HIT YOURSELF', width * .84, 100);
  text('REACH 10 TO WIN!', width * .84, 120);
  // first snake
  s.death(player[0].name,50,50)
  s.update();
  s.show(a, b,color);
  s.win();
  // second snake
  k.death(player[1].name,50,50)
  k.update();
  k.show(a, b + 60,color+255);
  k.win();
  // food
  if (s.eat(food)) {
    pickLocation();
  }
  if (k.eat(food)) {
    pickLocation();
  }
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

function won() {
  background(random(255), random(255), random(255));
  text('YOU WIN!!', width/2.6, height/2);
}

function mousePressed() {
  switch (state) {
    case ('go'):
      goMousePressed();
      break;
    case ('play'):
      play();
      break;
    case ('won'):
      won();
      break;
  }
}

function goMousePressed() {
  state = 'play';
}


function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  } else if (keyCode === 87) {
    k.dir(0, -1);
  } else if (keyCode === 83) {
    k.dir(0, 1);
  } else if (keyCode === 68) {
    k.dir(1, 0);
  } else if (keyCode === 65) {
    k.dir(-1, 0);
  }
}

// function gotCommand(error, results) {
//   if (error) {
//     console.error(error);
//   }
//   console.log(results[0].label, results[0].confidence);
//   if (results[0].label == 'up') {
//     s.dir(0, -1);
//   } else if (results[0].label == 'down') {
//     s.dir(0, 1);
//   } else if (results[0].label == 'right') {
//     s.dir(1, 0);
//   } else if (results[0].label == 'left') {
//     s.dir(-1, 0);
//   }
// }
