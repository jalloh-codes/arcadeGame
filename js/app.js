// declaring variable for the life(), addStars(), time() function
let heart = document.querySelector('#heart');
let seconds = document.querySelector('#time');
let stars = document.querySelector('#stars');
let gameTime;
let pass = 0;
let sec = 30;
let hleft = 3;



// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
     this.speed = speed;

     //image of the enemy
     this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    //the enemies loop back when it's off the table
    if (this.x > 510){
      this.x = -50;
      this.speed = 100 + Math.floor(Math.random() * 220);
    };

    // check if the enemy and the player touch
    if(player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 &&
    60 + player.y > this.y){
      player.x = 200;
      player.y = 400;
      newLife.lost();
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed) {
    // the palyer move along the x & y Line
    this.x = x;
    this.y = y;
    this.speed = speed;
    // the image of the play
   this.playerImg = [
     'images/char-boy.png',
     'images/char-cat-girl.png',
     'images/char-horn-girl.png',
     'images/char-pink-girl.png',
     'images/char-princess-girl.png'];
    this.sprite = this.playerImg[Math.floor(Math.random()*5)];
};

// draw the image of the player
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.win = function () {
    addStars();
    this.reset();
}

 Player.prototype.reset = function(){
     this.x = 200;
     this.y = 400;
 }

 Player.prototype.update = function () {
     if (this.x < 0 ) {
         this.x = 0;
     } else

     if (this.x > 450) {
         this.x = 400;
     } else

     if (this.y <= -4 ) {
       this.y = -4;
       this.win();
     } else

     if (this.y > 450) {
         this.y = 400;
     }
 };

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//aray Enemies
var allEnemies = [];

//location of the Enemies
var enemyLoc = [60, 147, 230];
var enemy;

enemyLoc.forEach( function (locaY) {
  enemy = new Enemy(0, locaY, 250 + Math.floor(Math.random() * 200));
  allEnemies.push(enemy);
});

// the starting point of the player
var player = new Player(200, 410, 50);

//control the speed of the play when each of the arrow is pressed
Player.prototype.handleInput = function(arrow) {
    switch (arrow) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 33;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 35;
            break;
    }
};



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//time, stras and hearts function

// the image of the stars
function addStars() {
  let img;
  pass++
  for (var i = 0; i < pass; i++) {
    img = document.createElement('IMG');
    img.src = 'images/star.png';
    stars.appendChild(img);
  }
  pass = 0;
}


// add the heart image
function Life() {
    var img;
    for (var i = 0; i < hleft; i++) {
        img = document.createElement('IMG');
        img.src = 'images/Heart.png';
        heart.appendChild(img);
    }
}

Life.prototype.lost = function() {
    if (hleft > 0) {
        heart.removeChild(heart.firstChild);
    }
}


var newLife = new Life();
//display in the time
function time() {
    seconds.innerText = sec--;
    if (heart.children.length === 0 || sec < 0) {
        clearInterval(gameTime);
        popUp();
    }
}

gameTime = setInterval(time, 1000);

// display popUp alert
function popUp() {
    const pop = document.querySelector('.popbox');
    pop.style.display = 'block';
    const oput = document.querySelector('.box');
    const first = oput.children[0];
    const second = oput.children[1];
    const btn = oput.children[2];
    first.innerText = `Game is Over`;
    second.innerHTML = `SCORE DETAILS= ${heart.children.length}` + `<img src=images/Heart.png>`;
    second.innerHTML += `and and ${stars.children.length}` +`<img src=images/star.png>`
    btn.addEventListener('click', function() {
    location.reload();
    });
}
