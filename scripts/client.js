console.log('client.js loaded');

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const gravity = 20;
const timeStep = 0.1;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

const world = {
  width: 12000,
  height: 600,
};

const worldList = [];
const platformList = [];
const collidableList = [];

const init = () => {
  // get the canvas so we can draw on it

  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  setInterval(draw, 10);

  // note it is crucial that the platforms stay in order of largest Y to smallest.

  new Platform(1100, 550, 200);
  new Platform(400, 500, 200);
  platformList.push(new Corpse(100, 410, 96, 96, true));
  new Platform(700, 400, 100);
  platformList.push(new Corpse(200, 310, 96, 96, false));
  new Platform(1100, 300, 150);

  new Boar(1);
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

const draw = () => {
  camera.move();

  // // draw the things
  background.render();

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
