let a = 30;
let b = 30;
let s;
let k;
let scl = 50;
let player = [{
  name: "Angel"
}, {
  name: "Demon"
}];
let food;
let score = 0;
let state = 'go';
let playing = true;

let humanImg;
let angelImg;
let devilImg;

let fr = 8;

let eatSound;
let startOverSound;
let hello;
let music;
let musicRate = 1;


function preload() {

  humanImg = loadImage('image/human.png');
  angelImg = loadImage('image/angel.png');
  devilImg = loadImage('image/devil.png');

  borderImg = loadImage('image/03_6x8 2.png');


  eatSound = loadSound('music/Alert/Alert-06.mp3');
  startOverSound = loadSound('music/Voice/Male/Voice-Hello-01.mp3');
  hello = loadSound('music/Voice/Male/Voice-Hello-01.mp3');
  music = loadSound('music/Music/Music-01.mp3');
  musicWon = loadSound('music/Music/bg_music.mp3');

}

function setup() {
  createCanvas(1000, 500);
  textSize(64);
  textAlign(CENTER, CENTER);
  textFont('Love Ya Like A Sister');
  fade = 0

  s = new Snake();
  k = new Snake();
  frameRate(fr);
  pickLocation();

}

function pickLocation() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}


function draw() {

  if (playing === true) {

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
}



function go() {
  background(48, 117, 187);
  image(borderImg, 0, 0);
  fill(67, 71, 62);
  textSize(20);
  text('In 2019, the demon creates an infectious disease and puts it in a bats body.', width / 2, height*.2);
  text('A farmer inadvertently ate the bat then the demon disease infected him immediately.', width / 2, height*.3);
  text('But the disease is cunning, it doesnt have any symptoms when the farmer gets it. ', width / 2, height*.4);
  text('The farmer keeps working and handouts with his friends in the next couple of days.', width / 2, height*.5);
  text('However, the demon disease spread out to anywhere in the world.', width / 2, height*.6);
  text('Many people are dead and fear full of the world.', width / 2, height*.7);
  textSize(36 );
  text('~Start!~', width / 2, height*.85);

}



function play() {
  // setTimeout(1000);
  if (!music.isPlaying()) {
    music.play();
  } else {
    background(48, 137, 187);
    textSize(16);
    textAlign(CENTER);
    fill(255);


    if (s.eat(food)) {
      eatSound.play();
      fr += 2;
      musicRate += 0.05;
      music.rate(musicRate);
      frameRate(fr);
      pickLocation();
    }

    //white
    if (k.eat(food)) {
      eatSound.play();
      fr += 2;
      musicRate += 0.05;
      music.rate(musicRate);
      frameRate(fr);
      pickLocation();
    }

    // first snake
    s.death()
    s.update();
    s.show(a, b, color);
    s.win();
    // second snake
    k.death()
    k.update();
    push();
    tint(255, 53, 104);
    k.show(a, b + 60, color);
    pop();
    k.win();
    // food
    //black
    image(humanImg, food.x, food.y, scl, scl);

  }
}

function won() {
  background(random(255), random(255), random(255));
  text('YOU WIN!!', width / 2, height / 2);

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
  $(document).ready(function(){
      $("#div1").fadeIn(3000);
  });

  $(document).ready(function(){
      $("#div1").fadeOut(3000);
  });

  $(document).ready(function(){
      $("#div2").fadeIn(3000);
  });

  $(document).ready(function(){
      $("#div2").fadeOut(3000);
  });
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
  } else if (keyCode === 80) {
    if (!hello.isPlaying()) {
      hello.play();
    }
    playing = !playing;
    text('Paused', width / 2, height / 2);

  }
}
