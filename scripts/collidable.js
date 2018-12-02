class collidable {
  constructor(X, Y, width, height) {
    this.X = X;
    this.Y = Y;
    this.width = width;
    this.height = height;
    collidableList.push(this);
  }

  checkCollision() {
    if (
      player.X + player.width > this.X &&
      player.X < this.X + this.width &&
      player.Y + player.height > this.Y &&
      player.Y < this.Y + this.height
    ) {
      player.getHit();
    }
  }

  render() {
    ctx.fillStyle = 'rgba(255,100,100,1)';
    ctx.fillRect(this.X - camera.X, this.Y - camera.Y, this.width, this.height);
    this.checkCollision();
  }
}
