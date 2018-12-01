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
  },

  render: () => {
    // ctx.fillStyle = 'rgba(255,0,0,1)';
    // ctx.fillRect(
    //   player.X - camera.X,
    //   player.Y - camera.Y,
    //   player.width,
    //   player.height
    // );
    image = new Image();
    image.src = 'resources/sprites/whtdragonscow.png';
    let currentSprite = player.facingRight
      ? playerSprites.left[player.animationFrame]
      : playerSprites.right[player.animationFrame];
    ctx.drawImage(
      image,
      currentSprite.X,
      currentSprite.Y,
      48,
      48,
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
        let airResistance = player.float * player.velocity * player.velocity;
        if (player.velocity < 0) {
          player.velocity += airResistance;
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
      player.Y = platform.Y;
    } else {
      player.Y = player.canvas.height - player.height;
    }
  },
};

worldList.push(player);
