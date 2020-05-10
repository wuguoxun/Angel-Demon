function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  this.score = score;

  this.eat = function(pos) {
    let d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      this.score++;
      return true;
    } else {
      return false;
    }
  };

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  this.death = function(player) {
    for (let i = 0; i < this.tail.length; i++) {
      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.score = 0;

        startOverSound.play();
        // music.rate(1);
        // fr = 1;
        textSize(64);
        textAlign(CENTER, CENTER);
        fill(255, 30, 30);
        text('Dead', width / 2, height / 2);
        text(player,width/3,height/2);

        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        this.total = 0;
        this.tail = [];
      }
    }
  };

  this.update = function() {
    // Expand snake
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    // Newest position
    this.tail[this.total - 1] = createVector(this.x, this.y);

    // Move snake
    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    //hit screen die
    // this.x = constrain(this.x, 0, width - scl);
    // this.y = constrain(this.y, 0, height - scl);

    // Keep on screen
    if (this.x > width - scl) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = width - scl;
    }
    if (this.y > height - scl) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = height - scl;
    }
  };


  // Draw snake
  this.show = function(a, b) {
    for (let i = 0; i < this.tail.length; i++) {
      image(humanImg, this.tail[i].x, this.tail[i].y, scl, scl);
    }
    image(angelImg,this.x, this.y, scl, scl);
    //angle
    textSize(64);
    text(this.score, a, b);

  };

  this.win = function() {

    if (this.score >= 10) {
      state = 'won';
      musicWon.play();

    }
  };



}
