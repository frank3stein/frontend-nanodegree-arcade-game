// var enemyMechanics=[
//         spawnLocation:[
//         [-100,(2*101+(101/2))],
//         [-100,(3*101+(101/2))],
//         [-100,(4*101+(101/2))]
//         ],
//         spawn:function (count){

//         }
//         ,
//         spawnPoints:function(){
//             var count=Math.floor((Math.random() * 3) + 1);
//             if (count==1){

//             }
//             else if(count==2){

//             }
//             else {
//                 count=3;
//             }
//         },


// ]

var Constants=new function() {
    this.Objects={
        ENEMY:{
            start_x:-150,
            start_y:200,
            // start_y:[100,150,200],
            width:101,
            height:171
        },
        PLAYER:{
            start_x:100,
            start_y:100,
            width:100,
            height:100
        }
    }
}


// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x=Constants.Objects.ENEMY.start_x;
    this.y=Constants.Objects.ENEMY.start_y;
    // [Math.floor(Math.random() * start_y.length)];
    this.sprite = 'images/enemy-bug.png';

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x<650) {
        this.x+=200*dt;
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
    Player.prototype.update=function(dt){

    }

    Player.prototype.render= function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    Player.prototype.handleInput=function(){

    }


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies=[
    // spawnLocation:[
    //     [-100,(2*101+(101/2))],
    //     [-100,(3*101+(101/2))],
    //     [-100,(4*101+(101/2))]
    // ]

];


// Here player and enemy sublass delegates its failed lookups to
var player= Object.create(Player.prototype);
var enemy=Object.create(Enemy.prototype);

for (i=0;allEnemies.length<6;i++){
allEnemies.push(enemy);
}
console.log(allEnemies);


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
