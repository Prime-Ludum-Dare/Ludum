const player = {
  height: 20,
  width: 20,
  speed: 7,
  velocity: 0,
  float: 0.0005,
  X: 150,
  Y: 150,
  falling: true,
  platform: null,
  canvas: document.getElementById('mainCanvas'),

  move: () => {
    //handle movement
    if (rightPressed && player.X < world.width - player.width) {
      player.X += player.speed;
    } else if (leftPressed && player.X > 0) {
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
    let image = new Image();
    image.src = 'resources/sprites/whtdragonscow.png';
    ctx.fillStyle = 'rgba(255,0,0,1)';
    ctx.fillRect(
      player.X - camera.X,
      player.Y - camera.Y,
      player.width,
      player.height
    );
    ctx.drawImage(image, player.X - camera.X, player.Y - camera.Y);
    player.move();
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
    while (i < platformList.length && platformList[i].Y < player.Y - player.velocity * timeStep && platformList[i].Y > player.Y) {
      let plat = platformList[i];
      let leftBound = plat.X - plat.width / 2;
      let rightBound = plat.X + plat.width / 2;
      if (leftBound < player.X && rightBound > player.X) {
        i = platformList.length;
        player.land(platform);
      }
      i++;
    }
  },

  checkEdge: platform => {
    let leftBound = platform.X - platform.width / 2;
    let rightBound = platform.X + platform.width / 2;
    if (player.X < leftBound || player.X > rightBound){
      player.platform = null;
      player.falling = true;
    }
  }
};

function findPlatformIntercept(Y, lIndex, rIndex) {
  if (rIndex - lIndex < 2) {
    return lIndex;
  } else {
    let mIndex = parseInt((lIndex + rIndex) / 2);
    if (mIndex > Y) {
      return findPlatformIntercept(Y, mIndex, rIndex);
    } else {
      return findPlatformIntercept(Y, lIndex, mIndex);
    }
  }
}

worldList.push(player);
