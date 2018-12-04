let platformImage = new Image();
platformImage.src = './resources/textures/platform.png';

class Platform {
  constructor(X, Y, width, hasBoar = false) {
    this.X = X;
    this.Y = Y;
    this.width = width;
    this.height = 32;
    this.spriteWidth = 32;
    let thisPlatform = platformList.push(this);
    sortPlatforms();
    if (hasBoar) {
      new Boar(thisPlatform - 1);
    }
  }

  render() {
    for (let offset = 0; offset < this.width; offset += this.spriteWidth) {
      ctx.drawImage(
        platformImage,
        this.X - camera.X + offset,
        this.Y - camera.Y
      );
    }
  }
}

class PlatformWithBoar extends Platform {
  constructor(X, Y, width) {
    super(X, Y, width, true);
  }
}
