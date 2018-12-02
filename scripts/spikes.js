let spikesImage = new Image();
spikesImage.src = "resources/textures/Jamie-clker-spikes.png";
console.log(spikesImage);

class Spikes extends collidable {
    constructor(X, Y, width, height) {
        super(X, Y, width, height);
    }

    render() {
        let pattern = ctx.createPattern(spikesImage, 'repeat')
        ctx.fillStyle = pattern;
        ctx.fillRect(
            this.X - camera.X,
            this.Y - camera.Y,
            this.width,
            this.height
          );
        this.checkCollision();
    }
}