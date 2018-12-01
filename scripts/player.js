const player = {
  height: 20,
  width: 20,
  speed: 7,
  velocity: 0,
  float: 0.002,
  X: 150,
  Y: 150,
  falling: true,
  platform: null,
  canvas: document.getElementById('mainCanvas'),
  move: () => {
    //handle movement
    if (rightPressed && player.X < player.canvas.width - player.width) {
      player.X += player.speed;
    } else if (leftPressed && player.X > 0) {
      player.X -= player.speed;
    }
    player.fall();
    player.Y -= player.velocity * timeStep;
    // if (downPressed && player.Y < player.canvas.height - player.height) {
    //   player.Y += player.speed;
    // } else if (upPressed && player.Y > 0) {
    //   player.Y -= player.speed;
    // }
  },

  render: () => {
    ctx.fillStyle = 'rgba(255,0,0,1)';
    ctx.fillRect(player.X, player.Y, player.width, player.height);
    player.move();
  },

  jump: () => {
    if (!player.falling) {
      player.platform = null;
      player.velocity += 20;
    }
  },

  fall: () => {
    if (player.falling) {
      if (player.Y < player.canvas.height - player.height) {
        player.velocity -= gravity * timeStep;
        let airResistance = player.float * player.velocity * player.velocity;
        if (player.velocity > 0) {
          player.velocity -= airResistance;
        } else {
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
