class Platform {
  constructor(X, Y, width, hasBoar = false) {
    this.X = X;
    this.Y = Y;
    this.width = width;
    let thisPlatform = platformList.push(this);
    sortPlatforms();
    if (hasBoar) {
      new Boar(thisPlatform - 1);
    }
  }

  render() {
    ctx.fillStyle = 'rgba(100,255,100,1)';
    ctx.fillRect(this.X - camera.X, this.Y - camera.Y, this.width, 5);
  }
}

class PlatformWithBoar extends Platform {
  constructor(X, Y, width) {
    super(X, Y, width, true);
  }
}
