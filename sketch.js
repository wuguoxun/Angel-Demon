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

  eatSound = loadSound('music/Alert/Alert-06.mp3');
  startOverSound = loadSound('music/Voice/Male/Voice-Hello-01.mp3');
  hello = loadSound('music/Voice/Male/Voice-Hello-01.mp3');
  music = loadSound('music/Music/Music-01.mp3');
  musicWon = loadSound('music/Music/bg_music.mp3');

}

function setup() {
  createCanvas(1200, 600);
  textSize(64);
  textAlign(CENTER, CENTER);
  print_links();
  textFont('Love Ya Like A Sister');

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
  fill(67, 71, 62);
  text('Are you ready!? Click To Start', width / 2, height / 5.5);
  text('Angel: Arrow Control', width / 2, height / 1.2);
  text('Devil: W,S,A,D', width / 2, height / 1.5);
  text('10 Point to win', width / 2, height / 3);
  text('No BACKWARD,Dont hit YOURSELF', width / 2, height / 2);
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
    s.death(player[0].name, 50, 50)
    s.update();
    s.show(a, b, color);
    s.win();
    // second snake
    k.death(player[1].name, 50, 50)
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
  text(player,width/3,height/3.5);

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
  } else if (keyCode === 80) {
    if (!hello.isPlaying()) {
      hello.play();
    }
    playing = !playing;
    text('Paused', width / 2, height / 2);

  }
}

function print_links() {
  print("https://discourse.processing.org/t/how-to-use-google-fonts-in-p5js-online-editor/6893");
  print("https://www.youtube.com/watch?v=3BanVQvCN6U&feature=youtu.be");
  print("https://fonts.google.com/specimen/Orbitron?selection.family=Orbitron");
  print("https://developers.google.com/fonts/docs/getting_started");
  print("new example adobe font: https://editor.p5js.org/kll/sketches/lhMj7jtAs");
  print("example font file load: https://editor.p5js.org/kll/sketches/5eAJTcNGR");
  print("example normal text: https://editor.p5js.org/kll/sketches/E7oh0oCjq");
}
