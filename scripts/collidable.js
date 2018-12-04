class collidable {
  constructor(X, Y, width, height) {
    this.X = X;
    this.Y = Y;
    this.width = width;
    this.height = height;
    this.marginTop = height / 2;
    collidableList.push(this);
  }

  checkCollision() {
    if (
      player.X + player.width - player.graceMargin > this.X &&
      player.X < this.X + this.width - player.graceMargin &&
      player.Y + player.height - player.graceMargin > this.Y + this.marginTop &&
      player.Y < this.Y + this.height - player.graceMargin
    ) {
      this.doHit();
    }
  }

  render() {
    ctx.fillStyle = 'rgba(255,100,100,1)';
    ctx.fillRect(this.X - camera.X, this.Y - camera.Y, this.width, this.height);
    this.checkCollision();
  }

  doHit() {}
}
