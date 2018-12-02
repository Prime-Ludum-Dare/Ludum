class Platform {
    constructor(X, Y, width) {
        this.X = X;
        this.Y = Y;
        this.width = width;
        platformList.push(this);
    }

    render() {
        ctx.fillStyle = 'rgba(100,255,100,1)';
        ctx.fillRect(
            this.X - camera.X,
            this.Y - camera.Y,
            this.width,
            5
        );
    }
}

// note it is crucial that the platforms stay in order of largest Y to smallest.

const P0 = new Platform(1100, 550, 300);
const P1 = new Platform(400, 500, 300);
const P2 = new Platform(700, 400, 200);
const P3 = new Platform(1100, 300, 250);