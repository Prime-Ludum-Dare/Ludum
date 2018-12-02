class HUD {
  constructor() {
    this.lives = {
      x: 10,
      y: 60,
      font: '60px Courier New',
      color: 'red',
    };
  }

  render() {
    // render the lives counter
    ctx.font = this.lives.font;
    ctx.fillStyle = this.lives.color;
    ctx.fillText(numberOfLives, this.lives.x, this.lives.y);
  }
}
