class Platform {
  constructor(X, Y, width) {
    this.X = X;
    this.Y = Y;
    this.width = width;
    platformList.push(this);
  }

  render() {
    ctx.fillStyle = 'rgba(100,255,100,1)';
    ctx.fillRect(this.X - camera.X, this.Y - camera.Y, this.width, 5);
  }
}
