console.log('client.js loaded');

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const gravity = 20;
const timeStep = 0.1;

let numberOfLives = 10;

let keyPressed = {
  up: false,
  down: false,
  right: false,
  left: false,
};

const world = {
  spawn: {
    X: 100,
    Y: 400,
  },
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
  player.spawn();

  setInterval(draw, 10);
};

buildLevel = () => {
  // note it is crucial that the platforms stay in order of largest Y to smallest.
  new PlatformWithBoar(1100, 550, 300);
  new Platform(400, 500, 200);
  new PlatformWithBoar(1100, 250, 250);
  new Platform(700, 400, 100);

  new Wyvern(700, 200, 200, 150);
  new Spikes(400, 575, 500, 25);
  new Spikes(1500, 575, 1000, 25);

  new Goal(400, 300);
};

keyDownHandler = event => {
  if (event.keyCode == 39) {
    keyPressed.right = true;
  } else if (event.keyCode == 37) {
    keyPressed.left = true;
  } else if (event.keyCode == 38) {
    keyPressed.up = true;
  } else if (event.keyCode == 40) {
    keyPressed.down = true;
  }
};

keyUpHandler = event => {
  if (event.keyCode == 39) {
    keyPressed.right = false;
  } else if (event.keyCode == 37) {
    keyPressed.left = false;
  } else if (event.keyCode == 38) {
    keyPressed.up = false;
  } else if (event.keyCode == 40) {
    keyPressed.down = false;
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

const winTheGame = () => {
  alert('You Escaped! Congrats!');
  numberOfLives = 10;
  player.spawn();
  keyPressed = {
    up: false,
    down: false,
    right: false,
    left: false,
  };
};
