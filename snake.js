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
        textSize(64);
        textAlign(CENTER, CENTER);
        fill(255,30,30);
        text('GAME OVER', width / 2, height / 2);
        text('Crush', width / 2, height / 1.5);        
        fill(46, 87, 140);
        text(player,width/3,height/3.5);
        fill(255, 187, 41);
        text('WON',width/1.5,height/3.5);

        // this.total = 0;
        this.tail = [];
      }
    }
  };

  this.update = function() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  };

  this.show = function(a, b,color) {
    fill(color);
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
    textSize(64);
    text(this.score, a, b);

  };

this.win = function(){

  if (this.score >= 10) {
    state = 'won';
  }
};

}
