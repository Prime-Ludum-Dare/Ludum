const camera = {
  X: 0,
  Y: 0,
  moveFieldWidth: 250,

  move: () => {
    // handle camera movement
    if (player.X > camera.X + canvas.width / 2 + camera.moveFieldWidth / 2) {
      camera.X = player.X - canvas.width / 2 - camera.moveFieldWidth / 2;
    }
    if (player.X < camera.X + canvas.width / 2 - camera.moveFieldWidth / 2) {
      camera.X = player.X - canvas.width / 2 + camera.moveFieldWidth / 2;
    }

    // limiters
    if (camera.X < 0) {
      camera.X = 0;
    } else if (camera.X > world.width - canvas.width) {
      camera.X = world.width - canvas.width;
    }
  },
};
