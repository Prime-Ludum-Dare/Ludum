const background = {
  numberOfLayers: 4,
  layers: [],
  speedOfParallax: 0.1,
  render: () => {
    for (let i = 0; i < background.layers.length; i++) {
      let layerOffset = camera.X * ((i + 1) * 0.1);
      while (layerOffset > canvas.width) {
        layerOffset -= canvas.width;
      }
      // draw the one that would normally scroll with the screen
      ctx.drawImage(
        background.layers[i],
        0 - layerOffset,
        0,
        canvas.width,
        canvas.height
      );
      // draw the second copy; we alternate between these two
      ctx.drawImage(
        background.layers[i],
        0 - layerOffset + canvas.width,
        0,
        canvas.width,
        canvas.height
      );
    }
  },
};

for (let i = 0; i < background.numberOfLayers; i++) {
  background.layers.push(new Image());
  background.layers[i].src = `resources/background/layers/${i}.png`;
}
