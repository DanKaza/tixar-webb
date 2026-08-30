const fs = require('fs');
const sharp = require('sharp');

async function process() {
  let svg = fs.readFileSync('public/assets/icons/tixar-logo.svg', 'utf8');

  // Remove the first <path> element (background rectangle fill="#040526")
  svg = svg.replace(
    /<path d="M0 0 C528 0 1056 0 1600 0 C1600 512\.16 1600 1024\.32 1600 1552 C1072 1552 544 1552 0 1552 C0 1039\.84 0 527\.68 0 0 Z\s*"\s*fill="#040526"\s*transform="translate\(0,0\)"\/>/,
    ''
  );

  fs.writeFileSync('public/assets/icons/tixar-logo-transparent.svg', svg);
  console.log('Transparent SVG saved');

  // Analyze content bounds
  const { data, info } = await sharp(Buffer.from(svg))
    .resize(400)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width, h = info.height, ch = info.channels;
  let top = h, bottom = 0, left = w, right = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * ch;
      const alpha = ch >= 4 ? data[idx + 3] : 255;
      if (alpha > 10) {
        if (y < top) top = y;
        if (y > bottom) bottom = y;
        if (x < left) left = x;
        if (x > right) right = x;
      }
    }
  }

  console.log('Content at 400px:', left + ',' + top, 'to', right + ',' + bottom);
  console.log('Content size:', (right - left + 1) + 'x' + (bottom - top + 1));

  // Scale to original
  const scale = 1600 / 400;
  const pad = 30;
  const cropL = Math.max(0, Math.floor(left * scale) - pad);
  const cropT = Math.max(0, Math.floor(top * scale) - pad);
  const cropW = Math.min(1600 - cropL, Math.ceil((right - left + 1) * scale) + pad * 2);
  const cropH = Math.min(1552 - cropT, Math.ceil((bottom - top + 1) * scale) + pad * 2);

  console.log('Crop:', cropL + ',' + cropT, cropW + 'x' + cropH);

  // Nav logo: 2x retina, transparent, max 300px wide
  const navBuf = await sharp(Buffer.from(svg))
    .extract({ left: cropL, top: cropT, width: cropW, height: cropH })
    .resize({ width: 300, height: 64, fit: 'inside' })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const navMeta = await sharp(navBuf).metadata();
  fs.writeFileSync('public/assets/icons/tixar-logo-nav.png', navBuf);
  console.log('Nav logo:', navMeta.width + 'x' + navMeta.height, Math.round(navBuf.length / 1024) + 'KB');

  // OG image: 1200x1200 with dark bg
  await sharp(Buffer.from(svg))
    .resize(1200, 1200, { fit: 'contain', background: '#050527' })
    .png({ quality: 90 })
    .toFile('public/assets/icons/tixar-logo-og.png');
  console.log('OG logo:', Math.round(fs.statSync('public/assets/icons/tixar-logo-og.png').size / 1024) + 'KB');

  // Favicon: 64x64
  await sharp(Buffer.from(svg))
    .resize(64, 64, { fit: 'contain', background: '#050527' })
    .png()
    .toFile('public/assets/icons/favicon.png');
  console.log('Favicon done');
}

process().catch((e) => console.error(e));
