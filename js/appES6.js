let allEnemies = new Array;
//
class Player {
  constructor(start_x, start_y, width, height, sprite, x, y) {
    this.start_x = 300;
    this.start_y = 400;
    this.width = 100;
    this.height = 85;
    this.sprite="images/char-boy.png";
    this.x = this.start_x;
    this.y = this.start_y;
  }

  reset(){
    this.x = this.start_x;
    this.y = this.start_y;
    // alert('Game reset');
  }

  update(dt){
    if (this.y==-25){
      this.reset();
    }
    for (var enemy in allEnemies){
      var distance=Math.abs(this.x-allEnemies[enemy].x);
      if (distance<60  &&  this.y==allEnemies[enemy].y){
        this.reset();
      }
    }
  }

  handleInput(key){
    if(key=='left' &&  this.x>0 || key=='a' && this.x>0){
      this.x-=this.width;
    }
    else if(key=='right' &&  this.x<600  || key=='d'  &&  this.x<600){
      this.x+=this.width;
    }
    else if(key=='up'  &&  this.y>10 || key=='w'   &&  this.y>10){
      this.y-=this.height;
    // This was used to check where the water y was
    // console.log(player.y);
    }
    else if(key=='down' &&  this.y<400 || key=='s'  &&  this.y<400){
      this.y+=this.height;
    }
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Enemy extends Player {
  constructor(speed){
    super();
    this.start_x = -50;
    this.start_y = [60,145,230,60,145,230];
    this.width = 101;
    this.height = 171;
    this.sprite = "images/enemy-bug.png";
    this.speed  = [200,300,400,250,350,450];
    this.x = this.start_x;
    this.y = getRandomWoutR(this.start_y);
    this.speed = getRandomWoutR(this.speed);
  }

  update(dt){
    if (this.x<650) {
        this.x+=this.speed*dt;
    }
    else{
        this.x=this.start_x;
    }
  }
  // reset() and update() is inherited from Player constructor.
}

// This function takes array as an input and picks a random element from it without replacement. So once picked an element cant be picked
// let getRandomWoutR = (function(){
//   let cache;
//   return function(array){
//     let randomIndex;
//     if ( cache == undefined || cache.lenght == 0){
//       cache = array;
//       console.log('first if ', cache);
//       randomIndex = Math.floor(Math.random()*cache.length);
//       return cache.splice(randomIndex, 1)[0];
//     } else if (cache.length > 0) {
//       console.log('second if ', cache);
//       randomIndex = Math.floor(Math.random()*cache.length);
//     return cache.splice(randomIndex, 1)[0];
//     } else if (cache.length = 1){
//       randomIndex = Math.floor(Math.random()*cache.length);
//       cache = array;
//       return cache.splice(randomIndex, 1)[0];
//     }
//   }
// }());

function getRandomWoutR(array){
  let randomIndex = Math.floor(Math.random()*array.length);
  return array.splice(randomIndex, 1)[0];
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Here New enemies are created till there are 7 enemies in total and pushed into the array allEnemies
for (let i=0; allEnemies.length<7;i++){
  allEnemies.push(new Enemy());
}

let player = new Player();


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



// // Enemy as the first class and player extending the enemy class.
// class Enemy {
//   constructor(start_x,start_y, width, height, sprite, speed) {
//     this.start_x = -150;
//     this.start_y = [60,145,230,60,145,230];
//     this.width = 101;
//     this.height = 171;
//     this.sprite="images/enemy-bug.png";
//     this.speed  = [200,300,400,250,350,450];
//   }
// }
//
// class Player extends Enemy {
//   constructor() {
//     super(300, 400, 100, 85, "images/char-boy.png");
//   }
// }

    // Enemy(x, y, speed){
    //   this.sprite = 'images/enemy-bug.png';
    //   this.x = start_x;
    //   this.y=getRandomWoutR(start_y);
    //   // Constants.Objects.ENEMY.start_y[Math.floor(Math.random()*Constants.Objects.ENEMY.start_y.length)];
    //   this.speed=getRandomWoutR(this.speed);
    // }

    // update(){
    //   if (this.x<650) {
    //       this.x+=this.speed*dt;
    //   }
    //   else{
    //       this.x=Constants.Objects.ENEMY.start_x;
    //   }
    // }

// class Enemy extends ENEMY {
//    constructor(x, y, speed, sprite) {
//      super();
//      this.sprite = 'images/enemy-bug.png';
//      this.x = this.start_x;
//      this.y=getRandomWoutR(this.start_y);
//      // Constants.Objects.ENEMY.start_y[Math.floor(Math.random()*Constants.Objects.ENEMY.start_y.length)];
//      this.speed=getRandomWoutR(this.speed);
//    }
// }
