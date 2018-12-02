console.log('client.js loaded');

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const gravity = 20;
const timeStep = 0.1;

let camera = {
  X: 0,
  Y: 0,
  moveFieldWidth: 350,
};

let rightPressed = false;
let leftPressed = false;
let upPressed = false;

let downPressed = false;

const world = {
  width: 1400,
  height: 600,
};

let background = new Image();
background.src = 'resources/space_background.png';

const worldList = [];
const platformList = [];
const collidableList = [];

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

const drawBackground = () => {
  ctx.drawImage(
    background,
    camera.X,
    camera.Y,
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



  // handle camera movement
  if (player.X > camera.X + canvas.width / 2 + camera.moveFieldWidth / 2) {
    camera.X = player.X - canvas.width / 2 - camera.moveFieldWidth / 2;
  }
  if (player.X < camera.X + canvas.width / 2 - camera.moveFieldWidth / 2) {
    camera.X = player.X - canvas.width / 2 + camera.moveFieldWidth / 2;
  }

  // camera.X = player.X - canvas.width / 2;

  // limiters
  if (camera.X < 0) {
    camera.X = 0;
  } else if (camera.X > world.width - canvas.width) {
    camera.X = world.width - canvas.width;
  }

  // // draw the things
  // drawPlayer();
  drawBackground();
  for (platform of platformList) {
    platform.render();
  }
  for (object of worldList) {
    object.render();
  }
  for (enemy of collidableList) {
    enemy.render();
  }
};
