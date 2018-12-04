playerSprites = {
  image: new Image(),
  left: [],
  right: [],
};

playerSprites.image.src = 'resources/sprites/whtdragonscow.png';

playerSprites.left.push({ X: 0, Y: 49 });
playerSprites.left.push({ X: 49, Y: 49 });
playerSprites.left.push({ X: 97, Y: 49 });
playerSprites.left.push({ X: 49, Y: 49 });

playerSprites.right.push({ X: 0, Y: 97 });
playerSprites.right.push({ X: 49, Y: 97 });
playerSprites.right.push({ X: 97, Y: 97 });
playerSprites.right.push({ X: 49, Y: 97 });

function playAudio(id) {
  let soundToPlay = document.getElementById(id);
  soundToPlay.play();
}

function pauseAudio(id) {
  let soundToPause = document.getElementById(id);
  soundToPause.pause();
}

const player = {
  sprites: playerSprites,
  height: 96,
  width: 96,
  facingRight: true,
  animationFrame: 0,
  animationDelay: 10,
  animationFrameMax: 4 * 10 - 1, // this is some hacky hard-coding; we should really convert this to a class and use a constructor
  speed: 5,
  jumpStrength: 80,
  jumpReady: false,
  glideReady: true,
  velocity: 0,
  float: 0.0005,
  X: 0,
  Y: 0,
  falling: true,
  moving: false,
  dying: false,
  graceMargin: 10,
  platform: null,
  canvas: document.getElementById('mainCanvas'),

  move: () => {
    //handle movement
    player.moving = false;
    if (keyPressed.right && player.X < world.width - player.width) {
      player.moving = true;
      player.facingRight = false;
      player.X += player.speed;
    } else if (keyPressed.left && player.X > 0) {
      player.moving = true;
      player.facingRight = true;
      player.X -= player.speed;
    }
    player.fall();
    if (keyPressed.up) {
      player.jump();
    }
    if (player.platform != null) {
      player.checkEdge(player.platform);
    }
  },

  render: () => {
    if (!player.dying) {
      let currentSprite = player.facingRight
        ? player.sprites.left[
            Math.trunc(player.animationFrame / player.animationDelay)
          ]
        : player.sprites.right[
            Math.trunc(player.animationFrame / player.animationDelay)
          ];
      ctx.drawImage(
        player.sprites.image,
        currentSprite.X,
        currentSprite.Y,
        47,
        47,
        player.X - camera.X,
        player.Y - camera.Y,
        player.width,
        player.height
      );
      player.move();

      if ((player.moving && !player.falling) || player.float > 0.0005) {
        player.animationFrame++;
      }

      if (player.animationFrame > player.animationFrameMax) {
        player.animationFrame = 0;
      }
    }
  },

  jump: () => {
    if (player.jumpReady) {
      player.Y -= 1;
      player.platform = null;
      player.velocity += player.jumpStrength;
      player.falling = true;
      player.jumpReady = false;
    } else if (player.glideReady) {
      player.float = 0.004;
    }
  },

  fall: () => {
    if (player.falling) {
      player.Y -= player.velocity * timeStep;
      if (!keyPressed.up) {
        player.float = 0.0005;
        player.glideReady = true;
      }
      player.velocity -= gravity * timeStep;
      if (player.velocity < 0) {
        player.velocity += player.float * player.velocity * player.velocity;
        player.checkPlatforms();
      }
      if (player.falling && player.Y >= player.canvas.height - player.height) {
        player.land();
      }
    } else if (!keyPressed.up) {
      player.jumpReady = true;
    }
  },

  land: (platform = null) => {
    player.falling = false;
    player.glideReady = false;
    player.float = 0.0005;
    player.velocity = 0;
    if (platform != null) {
      player.Y = platform.Y - player.height;
      player.platform = platform;
    } else {
      player.Y = player.canvas.height - player.height;
    }
  },

  checkPlatforms: () => {
    let i = 0//findPlatformIntercept(
    //player.Y + player.height,
    //0,
    //platformList.length - 1
    //);
    while (
      i < platformList.length
    ) {
      let plat = platformList[i];
      if (platformList[i].Y > player.Y + player.height && plat.Y < player.Y - player.velocity * timeStep + player.height) {
        let leftBound = plat.X - player.width;
        let rightBound = plat.X + plat.width;
        if (leftBound < player.X && rightBound > player.X) {
          i = platformList.length;
          player.land(plat);
        }
      }
      i++;
    }
  },

  checkEdge: platform => {
    let leftBound = platform.X;
    let rightBound = platform.X + platform.width;
    if (player.X + player.width < leftBound || player.X > rightBound) {
      player.platform = null;
      player.falling = true;
      player.Y -= 1
      player.velocity += 20;
    }
  },

  getHit: () => {
    console.log('was hit!');
    if (player.dying === false) {
      player.dying = true;
      playAudio('mooSound');
      playAudio('deathSound');
      numberOfLives -= 1;
      new Corpse(
        player.X,
        player.Y - 8,
        player.height,
        player.width,
        player.facingRight
      );
      player.spawn();
    }
  },

  spawn: () => {
    player.X = world.spawn.X;
    player.Y = world.spawn.Y;
    player.velocity = 0;
    player.dying = false;
    player.falling = true;
    player.jumpReady = false;
    player.glideReady = true;
    player.fall();
  },
};

function findPlatformIntercept(Y, lIndex, rIndex) {
  if (rIndex - lIndex < 2) {
    return lIndex;
  } else {
    let mIndex = parseInt((lIndex + rIndex) / 2);
    if (platformList[mIndex].Y > Y) {
      return findPlatformIntercept(Y, mIndex, rIndex);
    } else {
      return findPlatformIntercept(Y, lIndex, mIndex);
    }
  }
}

worldList.push(player);
