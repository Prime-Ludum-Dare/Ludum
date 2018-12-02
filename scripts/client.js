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

// const background = {
//   numberOfLayers: 4,
//   layers: [],
//   speedOfParallax: 0.1,
// };

// for (let i = 0; i < background.numberOfLayers; i++) {
//   background.layers.push(new Image());
//   background.layers[i].src = `resources/background/layers/${i}.png`;
// }

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
  for (let i = 0; i < background.layers.length; i++) {
    let layerOffset = camera.X * ((i + 1) * 0.1);
    while (layerOffset > canvas.width) {
      layerOffset -= canvas.width;
    }
    // draw the one that would normally scroll with the screen
    ctx.drawImage(
      background.layers[i],
      0 - layerOffset,
      0,
      canvas.width,
      canvas.height
    );
    // draw the second copy; we alternate between these two
    ctx.drawImage(
      background.layers[i],
      0 - layerOffset + canvas.width,
      0,
      canvas.width,
      canvas.height
    );
  }
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
  background.render();
  for (platform of platformList) {
    platform.render();
  }
  for (object of worldList) {
    object.render();
  }
};
