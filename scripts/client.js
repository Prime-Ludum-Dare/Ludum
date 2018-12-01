console.log('client.js loaded');

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

let player = {
  x: 150,
  y: 150,
  width: 20,
  height: 20,
  speed: 7,
};

let camera = {
  x: 0,
  y: 0,
};

let rightPressed = false;
let leftPressed = false;
let upPressed = false;

let downPressed = false;

const worldWidth = 1400;
const worldHeight = 600;

let background = new Image();
background.src = 'resources/space_background.png';

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
  ctx.fillStyle = 'rgba(255,0,0,1)';
  ctx.fillRect(player.x, player.y, player.width, player.height);
};

const drawBackground = () => {
  ctx.drawImage(
    background,
    camera.x,
    camera.y,
    canvas.width,
    canvas.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
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
  for (object of worldList) {
    object.render();
  }
};
