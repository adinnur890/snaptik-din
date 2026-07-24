const { createCanvas } = require('canvas');
const fs = require('fs');

function makeIcon(size) {
  const c = createCanvas(size, size);
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, '#FE2C55');
  grad.addColorStop(1, '#25F4EE');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = 'white';
  ctx.font = `bold ${Math.round(size * 0.6)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('S', size / 2, size / 2);
  return c.toBuffer('image/png');
}

fs.writeFileSync('./public/icon-192.png', makeIcon(192));
fs.writeFileSync('./public/icon-512.png', makeIcon(512));
console.log('Icons created!');
