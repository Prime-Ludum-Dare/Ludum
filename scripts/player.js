playerSprites = {
  image: new Image(),
  left: [],
  right: [],
};

playerSprites.image.src = 'resources/sprites/whtdragonscow.png';

playerSprites.left.push({ X: 0, Y: 49 });
playerSprites.left.push({ X: 49, Y: 49 });
playerSprites.left.push({ X: 97, Y: 49 });

playerSprites.right.push({ X: 0, Y: 97 });
playerSprites.right.push({ X: 49, Y: 97 });
playerSprites.right.push({ X: 97, Y: 97 });

const player = {
  sprites: playerSprites,
  height: 48,
  width: 48,
  facingRight: true,
  animationFrame: 0,
  animationFrameMax: 2,
  speed: 7,
  velocity: 0,
  float: 0.0005,
  X: 150,
  Y: 150,
  falling: true,
  moving: false,
  platform: null,
  canvas: document.getElementById('mainCanvas'),

  move: () => {
    //handle movement
    player.moving = false;
    if (rightPressed && player.X < world.width - player.width) {
      player.moving = true;
      player.facingRight = false;
      player.X += player.speed;
    } else if (leftPressed && player.X > 0) {
      player.moving = true;
      player.facingRight = true;
      player.X -= player.speed;
    }
    player.fall();
    player.Y -= player.velocity * timeStep;
    if (upPressed) {
      player.jump();
    }
    if (player.platform != null) {
      player.checkEdge(player.platform);
    }
  },

  render: () => {
    let currentSprite = player.facingRight
      ? player.sprites.left[player.animationFrame]
      : player.sprites.right[player.animationFrame];
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

    if (player.moving) {
      player.animationFrame++;
    }

    if (player.animationFrame > player.animationFrameMax) {
      player.animationFrame = 0;
    }
  },

  jump: () => {
    if (!player.falling) {
      player.Y -= 1;
      player.platform = null;
      player.velocity += 100;
      player.falling = true;
    }
  },

  fall: () => {
    if (player.falling) {
      if (player.Y < player.canvas.height - player.height) {
        player.velocity -= gravity * timeStep;
        if (player.velocity < 0) {
          player.velocity += player.float * player.velocity * player.velocity;
          player.checkPlatforms();
        }
      } else {
        player.land();
      }
    }
  },

  land: (platform = null) => {
    player.falling = false;
    player.velocity = 0;
    if (platform != null) {
      player.Y = platform.Y - player.height;
      player.platform = platform;
    } else {
      player.Y = player.canvas.height - player.height;
    }
  },

  checkPlatforms: () => {
    let i = findPlatformIntercept(player.Y, 0, platformList.length - 1);
    while (
      i < platformList.length &&
      platformList[i].Y > player.Y + player.height
    ) {
      let plat = platformList[i];
      if (plat.Y < player.Y - player.velocity * timeStep + player.height) {
        let leftBound = plat.X - player.width / 2;
        let rightBound = plat.X + plat.width - player.width / 2;
        if (leftBound < player.X && rightBound > player.X) {
          i = platformList.length;
          player.land(plat);
        }
      }
      i++;
    }
  },

  checkEdge: platform => {
    let leftBound = platform.X - player.width / 2;
    let rightBound = platform.X + platform.width - player.width / 2;
    if (player.X < leftBound || player.X > rightBound) {
      player.platform = null;
      player.falling = true;
    }
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
