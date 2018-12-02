class Corpse {
  constructor(X, Y, height, width, facingRight = true) {
    (this.X = X), (this.Y = Y), (this.height = height);
    this.width = width;
    this.facingRight = facingRight;
    this.sprite = {
      image: new Image(),
      offset: {
        X: 49,
        Y: this.facingRight ? 241 : 289,
      },
    };
    this.sprite.image.src = 'resources/sprites/deadcows.png';
    platformList.push(this);
    sortPlatforms();
  }

  render() {
    ctx.drawImage(
      this.sprite.image,
      this.sprite.offset.X,
      this.sprite.offset.Y,
      47,
      47,
      this.X - camera.X,
      this.Y,
      this.width,
      this.height
    );
  }
}
