console.log('client.js loaded');

const init = () => {
  // get the canvas so we can draw on it
  var canvas = document.getElementById('mainCanvas');
  var ctx = canvas.getContext('2d');

  // some example rectangles
  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  ctx.fillRect(30, 30, 50, 50);

  ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
  ctx.fillRect(0, 0, 800, 600);
};
