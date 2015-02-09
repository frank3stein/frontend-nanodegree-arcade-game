var Constants=new function() {
    this.Objects={
        ENEMY:{
            start_x:-150,
            start_y:[60,145,230,60,145,230],
            width:101,
            height:171,
            speed:[200,300,400,250,350,450]
        },
        PLAYER:{
            start_x:300,
            start_y:400,
            width:100,
            height:85
        }
    }
}


// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    // The Code below loads the enemy bug image
    // Then gets the x value from Constants, it is the same value as all the
    // bugs start from -150 with different speeds
    // The y values are chosen randomly with replacement. So they can spawn
    // on top of each other. With speed it is controlled so they act different.
    // The speed values are chosen randomly without replacement.
    // This ensures some variability in the speed of the objects.
    this.sprite = 'images/enemy-bug.png';
    this.x=Constants.Objects.ENEMY.start_x;
    this.y=getRandomWoutR(Constants.Objects.ENEMY.start_y);
    // Constants.Objects.ENEMY.start_y[Math.floor(Math.random()*Constants.Objects.ENEMY.start_y.length)];
    this.speed=getRandomWoutR(Constants.Objects.ENEMY.speed);
}

// This function takes array as an input and picks a random element from it without replacement. So once picked an element cant be picked
function getRandomWoutR(array){
  var randomIndex=Math.floor(Math.random()*array.length);
   return array.splice(randomIndex, 1)[0];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// As long as the enemy is within the screen the speed is adjusted

Enemy.prototype.update = function(dt) {
    if (this.x<650) {
        this.x+=this.speed*dt;
    }
    else{
        this.x=Constants.Objects.ENEMY.start_x;
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player =function(x,y){
    this.sprite="images/char-boy.png";
    this.x=Constants.Objects.PLAYER.start_x;
    this.y=Constants.Objects.PLAYER.start_y;
}

// Collision function
// First if the player reaches water -25y then the game resets
    Player.prototype.update=function(dt){
      if (this.y==-25){
        this.reset();

      }
// Here the collision is calculated by the absolute distance between
// each enemy object and the player for x and if they are in same row
// by checking for equality for y.
// Distance mathematically should be 100.5 but i used 60 because graphically
// it looks more correct. It is adjustable anyways.
      for (var enemy in allEnemies){
        var distance=Math.abs(this.x-allEnemies[enemy].x);
        if (distance<60  &&  this.y==allEnemies[enemy].y){
          this.reset();
        }
      }

    }
    Player.prototype.reset=function(){
      this.x=Constants.Objects.PLAYER.start_x;
      this.y=Constants.Objects.PLAYER.start_y;
    }

    Player.prototype.render= function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }


// Arrow keys and wasd keys can be used to move the player, also boundary
// conditions are included so player doesnt go off the grid.
    Player.prototype.handleInput=function(key){
      if(key=='left' &&  this.x>0 || key=='a' && this.x>0){
        this.x-=Constants.Objects.PLAYER.width;
      }
      else if(key=='right' &&  this.x<600  || key=='d'  &&  this.x<600){
        this.x+=Constants.Objects.PLAYER.width;
      }
      else if(key=='up'  &&  this.y>10 || key=='w'   &&  this.y>10){
        this.y-=Constants.Objects.PLAYER.height;
      // This was used to check where the water y was
      // console.log(player.y);
      }
      else if(key=='down' &&  this.y<400 || key=='s'  &&  this.y<400){
        this.y+=Constants.Objects.PLAYER.height;
      }
    }


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies=[];


// Here New enemies are created till there are 7 enemies in total and pushed into the array allEnemies
for (i=0;allEnemies.length<7;i++){
  allEnemies.push(new Enemy);
};



// Here player and enemy sublass delegates its failed lookups to
var player=new Player;
// var player= Object.create(Player.prototype);
// var enemy=Object.create(Enemy.prototype);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// I modified it so it also includes wasd keys for gameplay.
// Also changed the keyup to keydown to give player a faster
// click.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        87: 'w',
        65: 'a',
        68: 'd',
        83: 's'

    };

    player.handleInput(allowedKeys[e.keyCode]);
});
