console.log('client.js loaded');

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const gravity = 20;
const timeStep = 0.1;

let numberOfLives = 10;

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

let playerHUD;

const init = () => {
  // get the canvas so we can draw on it

  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  playerHUD = new HUD();
  buildLevel();

  setInterval(draw, 10);
};

buildLevel = () => {
  // note it is crucial that the platforms stay in order of largest Y to smallest.
  new PlatformWithBoar(1100, 550, 200);
  new Platform(400, 500, 200);
  new PlatformWithBoar(1100, 300, 150);
  new Corpse(100, 410, 96, 96, true);
  new Platform(700, 400, 100);
  new Corpse(200, 310, 96, 96, false);

  // new Boar(0);
  // new Boar(1);
  new Wyvern(700, 200, 200, 150);
  new Spikes(400, 575, 500, 25);
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
  playerHUD.render();

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

const sortPlatforms = () => {
  platformList.sort((a, b) => {
    return b.Y - a.Y;
  });
};
