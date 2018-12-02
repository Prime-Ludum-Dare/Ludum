console.log('client.js loaded');

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const gravity = 20;
const timeStep = 0.1;
// let player = {
//   x: 150,
//   y: 150,
//   width: 20,
//   height: 20,
//   speed: 7,
// };

let camera = {
  X: 0,
  Y: 0,
  moveFieldWidth: 300,
};

let rightPressed = false;
let leftPressed = false;
let upPressed = false;

let downPressed = false;

const world = {
  width: 12000,
  height: 600,
};

let bgLayer0 = new Image();
let bgLayer1 = new Image();
let bgLayer2 = new Image();
let bgLayer3 = new Image();

bgLayer0.src = 'resources/background/layers/0.png';
bgLayer1.src = 'resources/background/layers/1.png';
bgLayer2.src = 'resources/background/layers/2.png';
bgLayer3.src = 'resources/background/layers/3.png';

const worldList = [];
const platformList = [];

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
  let bg3offsetX = camera.X * 0.05;
  let bg2offsetX = camera.X * 0.125;
  let bg1offsetX = camera.X * 0.25;
  let bg0offsetX = camera.X * 0.5;

  while (bg3offsetX > canvas.width) {
    bg3offsetX -= canvas.width;
  }

  while (bg2offsetX > canvas.width) {
    bg2offsetX -= canvas.width;
  }

  while (bg1offsetX > canvas.width) {
    bg1offsetX -= canvas.width;
  }

  while (bg0offsetX > canvas.width) {
    bg0offsetX -= canvas.width;
  }

  ctx.drawImage(bgLayer3, 0 - bg3offsetX, 0, canvas.width, canvas.height);
  ctx.drawImage(
    bgLayer3,
    0 - bg3offsetX + canvas.width,
    0,
    canvas.width,
    canvas.height
  );

  ctx.drawImage(bgLayer2, 0 - bg2offsetX, 0, canvas.width, canvas.height);
  ctx.drawImage(
    bgLayer2,
    0 - bg2offsetX + canvas.width,
    0,
    canvas.width,
    canvas.height
  );

  ctx.drawImage(bgLayer1, 0 - bg1offsetX, 0, canvas.width, canvas.height);
  ctx.drawImage(
    bgLayer1,
    0 - bg1offsetX + canvas.width,
    0,
    canvas.width,
    canvas.height
  );

  ctx.drawImage(bgLayer0, 0 - bg0offsetX, 0, canvas.width, canvas.height);
  ctx.drawImage(
    bgLayer0,
    0 - bg0offsetX + canvas.width,
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
};
