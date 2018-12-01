console.log('client.js loaded');

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

const playerHeight = 20;
const playerWidth = 20;
const playerSpeed = 7;

let playerX = 150;
let playerY = 150;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;

let downPressed = false;

const worldList = [];

const init = () => {
  // get the canvas so we can draw on it

  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  setInterval(draw, 10);
};

keyDownHandler = event => {
  if (event.keyCode == 39) {
    rightPressed = true;
  } else if (event.keyCode == 37) {
    leftPressed = true;
  } else if (event.keyCode == 38) {
    upPressed = true;
  } else if (event.keyCode == 40) {
    downPressed = true;
  }
};

keyUpHandler = event => {
  if (event.keyCode == 39) {
    rightPressed = false;
  } else if (event.keyCode == 37) {
    leftPressed = false;
  } else if (event.keyCode == 38) {
    upPressed = false;
  } else if (event.keyCode == 40) {
    downPressed = false;
  }
};

const drawPlayer = () => {
  ctx.fillStyle = 'rgba(100,100,100,0.5)';
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
};

const draw = () => {
  // // clear the screen
  ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
  ctx.fillRect(0, 0, 800, 600);

  // // handle movement
  // if (rightPressed && playerX < canvas.width - playerWidth) {
  //   playerX += playerSpeed;
  // } else if (leftPressed && playerX > 0) {
  //   playerX -= playerSpeed;
  // }

  // if (downPressed && playerY < canvas.height - playerHeight) {
  //   playerY += playerSpeed;
  // } else if (upPressed && playerY > 0) {
  //   playerY -= playerSpeed;
  // }

  // // draw the things
  // drawPlayer();
  for(object of worldList){
    object.render();
  }
};
