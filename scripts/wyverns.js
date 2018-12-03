wyvernSprites = {
  image: new Image(),
  left: [],
  right: [],
};

wyvernSprites.image.src = 'resources/sprites/whtdragonswyvern.png';

wyvernSprites.left.push({ X: 0, Y: 64 });
wyvernSprites.left.push({ X: 96, Y: 64 });
wyvernSprites.left.push({ X: 192, Y: 64 });
wyvernSprites.left.push({ X: 96, Y: 64 });

wyvernSprites.right.push({ X: 0, Y: 128 });
wyvernSprites.right.push({ X: 96, Y: 128 });
wyvernSprites.right.push({ X: 192, Y: 128 });
wyvernSprites.right.push({ X: 96, Y: 128 });

class Wyvern extends collidable {
  constructor(X, Y, hLength, vLength) {
    super(X, Y, 60, 60);
    this.hLength = hLength;
    this.vLength = vLength;
    this.facingRight = true;
    this.ascending = false;
    this.sprites = wyvernSprites;
    this.animationFrame = 0;
    this.animationDelay = 10;
    this.animationFrameMax = this.sprites.left.length * this.animationDelay - 1;
    this.currentH = 0;
    this.currentV = 0;
    this.hSpeed = 1.5;
    this.vSpeed = 0.5;
  }

  move() {
    //handle movement
    this.checkPaths();
    if (this.facingRight) {
      this.X += this.hSpeed;
    } else {
      this.X -= this.hSpeed;
    }
    this.currentH++;
    if (this.ascending) {
      this.Y -= this.vSpeed;
    } else {
      this.Y += this.vSpeed;
    }
    this.currentV++;
    this.animationFrame++;
    if (this.animationFrame > this.animationFrameMax) {
      this.animationFrame = 0;
    }
  }

  checkPaths() {
    if (this.currentH > this.hLength) {
      this.facingRight = !this.facingRight;
      this.currentH = 0;
    }
    if (this.currentV > this.vLength) {
      this.ascending = !this.ascending;
      this.currentV = 0;
    }
  }

  render() {
    this.move();
    let currentSprite = !this.facingRight
      ? this.sprites.left[Math.trunc(this.animationFrame / this.animationDelay)]
      : this.sprites.right[
          Math.trunc(this.animationFrame / this.animationDelay)
        ];
    ctx.drawImage(
      this.sprites.image,
      currentSprite.X,
      currentSprite.Y,
      96,
      64,
      this.X - camera.X,
      this.Y - camera.Y,
      this.width * 1.5,
      this.height * 1.5
    );
    this.checkCollision();
  }
}
