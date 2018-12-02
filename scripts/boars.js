boarSprites = {
    image: new Image(),
    left: [],
    right: [],
};

boarSprites.image.src = 'resources/sprites/whtdragonswildboar.png';

boarSprites.left.push({ X: 0, Y: 49 });
boarSprites.left.push({ X: 49, Y: 49 });
boarSprites.left.push({ X: 97, Y: 49 });

boarSprites.right.push({ X: 0, Y: 97 });
boarSprites.right.push({ X: 49, Y: 97 });
boarSprites.right.push({ X: 97, Y: 97 });

class Boar extends collidable {
    constructor(platformNumber) {
        let plat = platformList[platformNumber]
        let platX = plat.X + plat.width / 2;
        let platY = plat.Y - 60 * 1.5;
        super(platX, platY, 60, 60);
        this.platform = plat;
        this.facingRight = false;
        this.animationFrame = 0;
        this.animationFrameMax = 2;
        this.speed = 1;
        this.sprites = boarSprites;
    }

    move() {
        //handle movement
        this.checkEdge();
        if (this.facingRight) {
            this.X += this.speed;
        } else {
            this.X -= this.speed;
        }
    }

    checkEdge() {
        if (this.facingRight && this.X + this.width > this.platform.X + this.platform.width) {
            this.facingRight = false;
        } else if (this.X < this.platform.X) {
            this.facingRight = true;
        }
    }

    render() {        
        this.move();
        let currentSprite = !this.facingRight
            ? this.sprites.left[this.animationFrame]
            : this.sprites.right[this.animationFrame];
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
}

const B1 = new Boar(1);