goalSprites = {
  image: new Image(),
};

goalSprites.image.src = 'resources/sprites/Barn_door.png';

class Goal extends collidable {
  constructor(X, Y) {
    super(X, Y, 288, 192);
    this.sprites = goalSprites;
  }

  render() {
    ctx.drawImage(
      this.sprites.image,
      this.X - camera.X,
      this.Y - camera.Y,
      this.width,
      this.height
    );
    this.checkCollision();
  }

  doHit() {
    winGame();
  }
}
