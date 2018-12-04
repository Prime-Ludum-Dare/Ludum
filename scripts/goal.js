goalSprites = {
  image: new Image(),
  left: [],
  right: [],
};

goalSprites.image.src = 'resources/sprites/whtdragonswildboar.png';

goalSprites.left.push({ X: 0, Y: 49 });

goalSprites.right.push({ X: 0, Y: 49 });

class Goal extends collidable {
  constructor(X, Y) {
    super(X, Y, 48, 48);
    this.facingRight = false;
    this.sprites = goalSprites;
    this.animationFrame = 0;
    this.animationDelay = 20;
    this.animationFrameMax = this.sprites.left.length * this.animationDelay - 1;
    this.speed = 0;
  }

  render() {
    let currentSprite = !this.facingRight
      ? this.sprites.left[Math.trunc(this.animationFrame / this.animationDelay)]
      : this.sprites.right[
          Math.trunc(this.animationFrame / this.animationDelay)
        ];
    ctx.drawImage(
      this.sprites.image,
      currentSprite.X,
      currentSprite.Y,
      47,
      47,
      this.X - camera.X,
      this.Y - camera.Y,
      this.width * 1.5,
      this.height * 1.5
    );
    this.checkCollision();
  }

  doHit() {
    winTheGame();
  }
}
