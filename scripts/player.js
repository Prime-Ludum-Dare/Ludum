const player = {
  height: 20,
  width: 20,
  speed: 7,
  X: 150,
  Y: 150,
  canvas: document.getElementById('mainCanvas'),
  move: () => {
    //handle movement
    if (rightPressed && player.X < world.width - player.width) {
      player.X += player.speed;
    } else if (leftPressed && player.X > 0) {
      player.X -= player.speed;
    }

    if (downPressed && player.Y < world.height - player.height) {
      player.Y += player.speed;
    } else if (upPressed && player.Y > 0) {
      player.Y -= player.speed;
    }
  },

  render: () => {
    ctx.fillStyle = 'rgba(255,0,0,1)';
    ctx.fillRect(
      player.X - camera.X,
      player.Y - camera.Y,
      player.width,
      player.height
    );
    player.move();
  },
};

worldList.push(player);
