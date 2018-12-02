class collidable {
    constructor(X, Y, width, height) {
        this.X = X;
        this.Y = Y;
        this.width = width;
        this.height = height;
        collidableList.push(this);
    }

    checkCollision() {
        let xDistance = player.X - (this.X - camera.X) + (player.width + this.width) / 2;
        let yDistance = player.Y - (this.Y - camera.Y) + (player.height + this.height) / 2;
        let rDistance = xDistance * xDistance + yDistance * yDistance;
        if (rDistance < 1000) {
            player.getHit();
        }
    }

    render() {
        ctx.fillStyle = 'rgba(255,100,100,1)';
        ctx.fillRect(
            this.X - camera.X,
            this.Y - camera.Y,
            this.width,
            this.height,
        );
        this.checkCollision();
    }
}

C1 = new collidable(300, 350, 10, 10);